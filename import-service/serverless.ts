import type { AWS } from "@serverless/typescript";

import importProductsFile from "@functions/importProductsFile";
import importFileParser from "@functions/importFileParser";
import {
  BUCKET_ARN,
  SQS_QUEUE_LOCAL_NAME,
  SQS_QUEUE_NAME,
  // BUCKET,
} from "src/constants";

const serverlessConfiguration: AWS = {
  service: 'import-service',
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
      SQS_URL: {
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
      // ImportServiceBucket: {
      //   Type: "AWS::S3::Bucket",
      //   Properties: {
      //     BucketName: BUCKET,
      //     AccessControl: "PublicRead",
      //     CorsConfiguration: {
      //       CorsRules: [
      //         {
      //           AllowedMethods: ["GET", "PUT"],
      //           AllowedHeaders: ["*"],
      //           AllowedOrigins: ["*"],
      //         },
      //       ],
      //     },
      //   },
      // },
      // ImportServiceBucketPolicy: {
      //   Type: "AWS::S3::BucketPolicy",
      //   Properties: {
      //     Bucket: {
      //       Ref: "ImportServiceBucket",
      //     },
      //     PolicyDocument: {
      //       Statement: [
      //         {
      //           Sid: "AllowPublicRead",
      //           Effect: "Allow",
      //           Principal: { AWS: "*" },
      //           Action: "s3:GetObject",
      //           Resource: `arn:aws:s3:::${BUCKET}/*`,
      //         },
      //       ],
      //     },
      //   },
      // },

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
