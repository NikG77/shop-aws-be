import 'source-map-support/register';
import { SQSEvent } from 'aws-lambda';

import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { addProductData } from '@libs/data-access';

import { IProduct } from 'src/products-list';
import { Publisher } from 'src/publisher';
import { logger } from '@libs/logger';

export const catalogBatchProcess = async (event: SQSEvent, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    logger.info(`SQS Event: ${JSON.stringify(event)}`);

    const products: Omit<IProduct, 'id'>[] = event.Records.map(({ body }) => JSON.parse(body));
    const insertedProducts: IProduct[] = [];

    for (const product of products) {
        try {
            const insertedProduct = await addProductData(product);
            if (insertedProduct != null) {
                insertedProducts.push(insertedProduct!);
                logger.info(`product: ${JSON.stringify(insertedProduct)} has been uploaded`);

                await Publisher.publishProduct(insertedProduct!);
            }
        } catch (error) {
            logger.error(`Error: ${error}`);
        }
    }

    return formatJSONResponse({ products: insertedProducts });
};

export const main = middyfy(catalogBatchProcess);
