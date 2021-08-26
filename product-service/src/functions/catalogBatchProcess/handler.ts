import 'source-map-support/register';

import { middyfy } from '@libs/lambda';
import { logger } from '@libs/logger';
import { SNS } from 'aws-sdk/clients/browser_default';
import { ErrorResponse, logRequestData } from '@libs/apiGateway';
import { addProductData } from '@libs/data-access';
import { HttpCode } from 'src/constants';

export const catalogBatchProcess = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    logRequestData(event, 'catalog-batch-process');

    const sns = new SNS();

    event.Records.map(async ({ body }) => {
        try {
            const { product } = JSON.parse(body);
            logger.info(`Product: ${product}`);

            if (product != null) {
                const insertedProduct = await addProductData(product);

                logger.info(`InsertedProduct: ${insertedProduct}`);

                const message = `Product ${insertedProduct?.title} is added to database`;
                logger.info(message);

                const result = await sns.publish({
                    Subject: 'New product',
                    Message: message,
                    TopicArn: process.env.CREATE_PRODUCT_SNS_ARN,
                    MessageAttributes: {
                        isExpensive: {
                            DataType: 'String',
                            StringValue: `${Number(insertedProduct?.price) > 100}`,
                        },
                    },
                });
                logger.info('Email is sent');

                return result;
            }
            return new ErrorResponse(`Failed to insert product: ${product}`, HttpCode.InternalServerError);
        } catch (err) {
            logger.error(`Error while adding product to database: ${JSON.stringify(err)}`);
        }
    });
};

export const main = middyfy(catalogBatchProcess);
