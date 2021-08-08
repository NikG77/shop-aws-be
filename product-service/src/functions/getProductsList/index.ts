import { handlerPath } from "@libs/handlerResolver";

export default {
    handler: `${handlerPath(__dirname)}/handler.main`,
    events: [
        {
            http: {
                method: "get",
                path: "products",
                cors: true,
                documentation: {
                    summary: "Get all available products",
                    description: "Get all available products",
                    methodResponses: [
                        {
                            statusCode: 200,
                            responseBody: {
                                description: "All available products",
                            },
                            responseModels: {
                                "application/json": "ProductItemsArray",
                            },
                        },
                        {
                            statusCode: 500,
                            responseBody: {
                                description: "An error message when getting all products",
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
