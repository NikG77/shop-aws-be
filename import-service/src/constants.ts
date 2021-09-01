export const BUCKET = `shop-aws-s3`;
export const BUCKET_ARN = `arn:aws:s3:::${BUCKET}`;
export const SQS_QUEUE_LOCAL_NAME = "SQSQueue";
export const SQS_QUEUE_NAME = "catalog-items-queue";

export enum HttpCode {
  Ok = 200,
  NotFound = 404,
  InternalServerError = 500,
  BadRequest = 400,
}

export enum CsvFileFolder {
  Uploaded = 'uploaded',
  Parsed = 'parsed',
}
