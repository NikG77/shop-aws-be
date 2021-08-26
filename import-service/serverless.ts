import type { AWS } from "@serverless/typescript";

import importProductsFile from "@functions/importProductsFile";
import importFileParser from "@functions/importFileParser";
import {
  BUCKET_ARN,
  SERVICE_NAME,
  SQS_QUEUE_LOCAL_NAME,
  SQS_QUEUE_NAME,
} from "./src/constants";

const serverlessConfiguration: AWS = {
  service: SERVICE_NAME,
  frameworkVersion: "2",
  custom: {
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: true,
    },
  },
  plugins: ["serverless-webpack"],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    region: "eu-west-1",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      CREATE_PRODUCT_SQS_URL: {
        Ref: SQS_QUEUE_LOCAL_NAME,
      },
    },
    lambdaHashingVersion: "20201221",

    iam: {
      role: {
        statements: [
          {
            Effect: "Allow",
            Action: "s3:ListBucket",
            Resource: [BUCKET_ARN],
          },
          {
            Effect: "Allow",
            Action: "s3:*",
            Resource: [`${BUCKET_ARN}/*`],
          },
          {
            Effect: "Allow",
            Action: "sqs:*",
            Resource: [
              {
                "Fn::GetAtt": [SQS_QUEUE_LOCAL_NAME, "Arn"],
              },
            ],
          },
        ],
      },
    },
  },

  resources: {
    Resources: {      
      [SQS_QUEUE_LOCAL_NAME]: {
        Type: "AWS::SQS::Queue",
        Properties: {
          QueueName: SQS_QUEUE_NAME,
        },
      },
    },
  },
  // import the function via paths
  functions: { importProductsFile, importFileParser },
};

module.exports = serverlessConfiguration;
