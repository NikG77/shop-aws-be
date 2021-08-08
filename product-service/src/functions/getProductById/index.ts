import { handlerPath } from "@libs/handlerResolver";

export default {
    handler: `${handlerPath(__dirname)}/handler.main`,
    events: [
        {
            http: {
                method: "get",
                path: "products/{productId}",
                cors: true,
                request: {
                    parameters: {
                        paths: {
                            productId: true,
                        },
                    },
                },
                documentation: {
                    summary: "Get product by id",
                    description: "Returns single product by it's id",
                    pathParams: [
                        {
                            name: "id",
                            description: "The unique product id",
                            schema: { type: "string" },
                        },
                    ],
                    methodResponses: [
                        {
                            statusCode: 200,
                            responseBody: {
                                description:
                                    "An object with the found product data",
                            },
                            responseModels: {
                                "application/json": "ProductItem",
                            },
                        },
                        {
                            statusCode: 404,
                            responseBody: {
                                description: "Product with such id not found",
                            },
                            responseModels: {
                                'application/json': 'object',
                            },
                        },
                        {
                            statusCode: 500,
                            responseBody: {
                                description:
                                    "An error message when getting a product",
                            },
                            responseModels: {
                                'application/json': 'object',
                            },
                        },
                    ],
                },
            },
        },
    ],
};
