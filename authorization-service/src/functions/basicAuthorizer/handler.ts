import "source-map-support/register";

import { middyfy } from "@libs/lambda";
import { APIGatewayAuthorizerResult } from "aws-lambda";

const basicAuthorizer = async (event, _context, callback) => {
  console.log("Basic authorizer event received", event);

  if (event.type !== "TOKEN") {
    callback("Unauthorized");
    console.error("Incorrect event type");
    return null;
  }

  try {
    const { authorizationToken, methodArn } = event;
    const { encodedCredentials, username, password } =
      getUserCredentials(authorizationToken);

    console.log(`User credentials: ${username}/${password}`);

    const effect = getEffect(username, password);
    const policy = generatePolicy(encodedCredentials, methodArn, effect);
    callback(null, policy);

    console.log(`User authorization result: ${effect}`);

    return policy;
  } catch (err) {
    callback(`Unauthorized: ${err.message}`);
    console.error(err);
  }
};

const getUserCredentials = (authorizationToken: string) => {
  const encodedCredentials = authorizationToken.split(" ")[1];
  const buff = Buffer.from(encodedCredentials, "base64");
  const [username, password] = buff.toString("utf-8").split(":");
  return { encodedCredentials, username, password };
};

const getEffect = (username: string, password: string) => {
  const storedUserPassword = process.env[username];
  const isPasswordCorrect =
    storedUserPassword && storedUserPassword === password;
  return isPasswordCorrect ? "Allow" : "Deny";
};

const generatePolicy = (
  principalId,
  Resource,
  Effect = "Allow"
): APIGatewayAuthorizerResult => ({
  principalId,
  policyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Action: "execute-api:Invoke",
        Effect,
        Resource,
      },
    ],
  },
});

export const main = middyfy(basicAuthorizer);
