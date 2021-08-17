// import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda"
// import type { FromSchema } from "json-schema-to-ts";

// type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & { body: FromSchema<S> }
// export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<ValidatedAPIGatewayProxyEvent<S>, APIGatewayProxyResult>

// export const formatJSONResponse = (response: Record<string, unknown>) => {
//   return {
//     statusCode: 200,
//     body: typeof response === 'string' ? response : JSON.stringify(response)
//   }
// }


// export const logRequest = (event): void => {
//   const { httpMethod, resource, queryStringParameters, pathParameters, body } =
//     event;

//   console.log(
//     httpMethod,
//     resource,
//     JSON.stringify({
//       queryStringParameters,
//       pathParameters,
//       body,
//     })
//   );
// };



export const logRequest = (event): void => {
  const { httpMethod, resource, queryStringParameters, pathParameters, body } =
    event;

  console.log(
    httpMethod,
    resource,
    JSON.stringify({
      queryStringParameters,
      pathParameters,
      body,
    })
  );
};

export const formatJSONResponse = (
  response?: string | any,
  statusCode = 200
) => {
  return {
    statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: typeof response === "string" ? response : JSON.stringify(response),
  };
};
