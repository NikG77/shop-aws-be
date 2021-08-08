import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import * as mockContext from "aws-lambda-mock-context";

import { HttpCode } from "src/constants";
import { getProductById } from "../functions/getProductById/handler";

describe("Unit test for getProductById handler", function () {
    const ctx = mockContext.default();
    const cb = () => null;

    it("should find proper product by id", async () => {
        const event: Pick<APIGatewayProxyEvent, "pathParameters"> = {
            pathParameters: {
                productId: "1",
            },
        };
        const result = (await getProductById(
            event as APIGatewayProxyEvent,
            ctx,
            cb
        )) as APIGatewayProxyResult;
        const body = JSON.parse(result.body);

        expect(result.statusCode).toEqual(HttpCode.Ok);
        expect(body.product.title).toEqual(
            "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"
        );
    });

    it("should return not found if there is no such product", async () => {
        const event: Pick<APIGatewayProxyEvent, "pathParameters"> = {
            pathParameters: {
                productId: "some-id",
            },
        };
        const result = (await getProductById(
            event as APIGatewayProxyEvent,
            ctx,
            cb
        )) as APIGatewayProxyResult;

        expect(result.statusCode).toEqual(HttpCode.NotFound);
    });
});
