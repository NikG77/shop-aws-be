import type {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
} from "aws-lambda";
import type { FromSchema } from "json-schema-to-ts";
import { ErrorResponseParams } from "./libs.models";

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, "body"> & {
  body: FromSchema<S>;
};
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<
  ValidatedAPIGatewayProxyEvent<S>,
  APIGatewayProxyResult
>;

export const formatJSONResponse = (response: Record<string, unknown>) => {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Method': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Origin': '*'
  },
    body: JSON.stringify(response.data),
  };
};

export const formatErrorResponse = ({
  statusCode,
  errorMessage,
}: ErrorResponseParams) => {
  return {
    statusCode,
    body: JSON.stringify({
      errorMessage,
    }),
  };
};
