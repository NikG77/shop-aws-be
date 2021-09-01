import 'source-map-support/register';
import { APIGatewayProxyHandler } from 'aws-lambda';

import { ErrorResponse, formatJSONResponse, logRequestData } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import { s3 } from 'src/S3Service';
import { HttpCode } from 'src/constants';
import { logger } from "@libs/logger";

export const importProductsFile: APIGatewayProxyHandler = async event => {
    logRequestData(event, 'importProductsFile');

    const fileName = event.queryStringParameters?.name;

    try {
        if (fileName) {
            const signedUrl = await s3.getSignedUrlPromise(fileName);

            logger.info(`Signed url: ${signedUrl}`);

            return formatJSONResponse({ signedUrl });
        }

        return new ErrorResponse(`File name must be present: ${fileName}`, HttpCode.BadRequest);
    } catch (error) {
        return new ErrorResponse(`Failed To Import Products File: ${error}`);
    }
};

export const main = middyfy(importProductsFile);