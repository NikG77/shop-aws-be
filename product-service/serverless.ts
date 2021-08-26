import type { AWS } from '@serverless/typescript';
import getProductsList from '@functions/getProductsList';
import getProductById from '@functions/getProductById';
import addProduct from '@functions/add-product';
import deleteProductById from '@functions/delete-product-by-id';
import catalogBatchProcess from '@functions/catalogBatchProcess';

import * as Config from './src/config';

import * as ProductItemSchema from '@schemas/ProductItem.json';
import * as ProductItemsArraySchema from '@schemas/ProductItemsArray.json';
import { SNS_TOPIC_LOCAL_NAME, SNS_TOPIC_NAME } from './src/constants';

const serverlessConfiguration: AWS = {
    service: 'product-service',
    frameworkVersion: '2',
    custom: {
        webpack: {
            webpackConfig: './webpack.config.js',
            includeModules: true,
        },
        documentation: {
            version: '1.0.0',
            title: 'Product Service API',
            description: 'Simple API to get products',
            models: [
                {
                    name: 'ProductItem',
                    description: 'Single Product',
                    contentType: 'application/json',
                    schema: ProductItemSchema,
                },
                {
                    name: 'ProductItemsArray',
                    description: 'All Available Products',
                    contentType: 'application/json',
                    schema: ProductItemsArraySchema,
                },
            ],
        },
    },
    plugins: ['serverless-webpack', '@conqa/serverless-openapi-documentation'],
    provider: {
        name: 'aws',
        runtime: 'nodejs14.x',
        region: 'eu-west-1',
        apiGateway: {
            minimumCompressionSize: 1024,
            shouldStartNameWithService: true,
        },
        environment: {
            AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
            PG_HOST: Config.DATABASE.HOST,
            PG_PORT: String(Config.DATABASE.PORT),
            PG_DATABASE: Config.DATABASE.NAME,
            PG_USERNAME: Config.DATABASE.USER,
            PG_PASSWORD: Config.DATABASE.PASS,
            CREATE_PRODUCT_SNS_ARN: {
                Ref: SNS_TOPIC_LOCAL_NAME,
            },
        },
        lambdaHashingVersion: '20201221',
        iam: {
            role: {
                statements: [
                    {
                        Effect: 'Allow',
                        Action: 'sns:*',
                        Resource: { Ref: SNS_TOPIC_LOCAL_NAME },
                    },
                ],
            },
        },
    },
    resources: {
        Resources: {
            [SNS_TOPIC_LOCAL_NAME]: {
                Type: 'AWS::SNS::Topic',
                Properties: {
                    TopicName: SNS_TOPIC_NAME,
                },
            },
            SNSSubscriptionExpensiveProducts: {
                Type: 'AWS::SNS::Subscription',
                Properties: {
                    Endpoint: 'georgy_nikitin@epam.com',
                    Protocol: 'email',
                    TopicArn: {
                        Ref: SNS_TOPIC_LOCAL_NAME,
                    },
                    FilterPolicy: {
                      isExpensive: ["true"],
                    },
                },
            },
            SNSSubscriptionCheapProducts: {
                Type: 'AWS::SNS::Subscription',
                Properties: {
                    Endpoint: 'georgiy.nikitin@gmail.com',
                    Protocol: 'email',
                    TopicArn: {
                        Ref: SNS_TOPIC_LOCAL_NAME,
                    },
                    FilterPolicy: {
                      isExpensive: ["false"],
                    },
                },
            },
        },
    },
    // import the function via paths
    functions: { getProductsList, getProductById, addProduct, deleteProductById, catalogBatchProcess },
};

module.exports = serverlessConfiguration;
