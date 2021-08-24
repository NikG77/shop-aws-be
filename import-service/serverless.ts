import type { AWS } from "@serverless/typescript";

import importProductsFile from "@functions/importProductsFile";
import importFileParser from "@functions/importFileParser";
import { BUCKET_ARN } from "./src/constants";

const serverlessConfiguration: AWS = {
  service: "import-service",
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
        ],
      },
    },
  },
  // import the function via paths
  // functions: { hello },
  functions: { importProductsFile, importFileParser },
};

module.exports = serverlessConfiguration;
