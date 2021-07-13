# NodeJS For AWS course Backend part

Front-end part of application is available [here](https://ddmfi45vfj3f1.cloudfront.net/)

Task 3 back-end changes is available [here](https://github.com/NikG77/shop-aws-be/pull/1)
Task 3 front-end changes is available [here](https://github.com/NikG77/shop-react-redux-cloudfront/pull/2)


What was done:
 - Main part:
    - added serverless configuration for two lambda functions
    - lambda functions getProductsList and getProducts returns correct response
    - front-end application integrated with product service and available [here](https://ddmfi45vfj3f1.cloudfront.net/)
 - Additional part:
    - lambda handlers described as async functions
    - es6 modules are user for implementation
    - webpack configured for product-service
    - lambda handlers written in different module files
    - product not found error covered by API using try catch


### Api Methods:
1. List of Products:
```
GET - https://v36qxqri4i.execute-api.eu-west-1.amazonaws.com/dev/products
```

2. Retrieve Product:
```
GET - https://v36qxqri4i.execute-api.eu-west-1.amazonaws.com/dev/products/{productId}
Example: https://v36qxqri4i.execute-api.eu-west-1.amazonaws.com/dev/products/4

```
  