import { handlerPath } from "@libs/handlerResolver";
import { SQS_ARN } from "../../constants";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      sqs: {
        batchSize: 5,
        arn: SQS_ARN,
      },
    },
  ],
};
