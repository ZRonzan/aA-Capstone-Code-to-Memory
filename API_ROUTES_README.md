# API-Routes

## All endpoints that require authentication

All endpoints that require a current user to be logged in.

- Request: endpoints that require authentication
- Error Response: Require authentication

  - Status Code: 401
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Authentication required",
      "statusCode": 401
    }
    ```

## All endpoints that require proper authorization

All endpoints that require authentication and the current user does not have the
correct role(s) or permission(s).

- Request: endpoints that require proper authorization
- Error Response: Require proper authorization

  - Status Code: 403
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Forbidden",
      "statusCode": 403
    }
    ```

## Get the Current User

Returns the information about the current user that is logged in.

- Require Authentication: true
- Request

  - Method: GET
  - URL: /api/users/current-user
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "firstName": "Demo",
      "lastName": "Demo",
      "email": "demo@aa.io",
      "buyingPower": 1000000.00
    }
    ```

## Log In a User

Logs in a current user with valid credentials and returns the current user's
information.

- Require Authentication: false
- Request

  - Method: POST
  - URL: /api/session
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "email": "demo@aa.io",
      "password": "password"
    }
    ```

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "firstName": "Demo",
      "lastName": "Demo",
      "email": "demo@aa.io",
      "buyingPower": 1000000.00,
      "token": ""
    }
    ```

- Error Response: Invalid credentials

  - Status Code: 401
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Invalid credentials",
      "statusCode": 401
    }
    ```

- Error response: Body validation errors

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "email": "Email is required",
        "password": "Password is required"
      }
    }
    ```

## Log Out a User

Logs out the current user

- Require Authentication: true
- Request

  - Method: DELETE
  - URL: /api/session
  - Headers:
    - Content-Type: application/json
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Successfully logged out",
      "statusCode": 200
    }
    ```

## Sign Up a User

Creates a new user, logs them in as the current user, and returns the current
user's information.

- Require Authentication: false
- Request

  - Method: POST
  - URL: /api/users
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "firstName": "Demo",
      "lastName": "Demo",
      "email": "demo@aa.io",
      "password": "password"
    }
    ```

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "firstName": "Demo",
      "lastName": "Demo",
      "email": "demo@aa.io",
      "buyingPower": 0,
      "token": ""
    }
    ```

- Error response: User already exists with the specified email

  - Status Code: 403
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "User already exists",
      "statusCode": 403,
      "errors": {
        "email": "User with that email already exists"
      }
    }
    ```

- Error response: Body validation errors

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "email": "Invalid email",
        "firstName": "First Name is required",
        "lastName": "Last Name is required",
        "password": "Password is required"
      }
    }
    ```

## Get all Watchlists created by the Current User

Return all the watchlists.

- Require Authentication: true
- Request

  - Method: GET
  - URL: /api/users/current-user/watchlists
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "Watchlists": [
        {
          "id": 1,
          "name": "FinTech",
          "userId": 1
        },
        {
          "id": 2,
          "name": "Healthcare",
          "userId": 1
        }
      ]
    }
    ```

## Create a Watchlist

Creates and returns a new watchlist.

- Require Authentication: true
- Request

  - Method: POST
  - URL: /api/watchlists
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "name": "FinTech"
    }
    ```

- Successful Response

  - Status Code: 201
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "name": "FinTech",
      "userId": 1
    }
    ```

  - Error Response: Body validation error

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Validation Error",
      "statusCode": 400,
      "errors": {
        "name": "Name is required",
      }
    }
    ```

## Edit a Watchlist

Updates and returns an edited watchlist.

- Require Authentication: true
- Require proper authorization: Watchlist must belong to the current user
- Request

  - Method: PUT
  - URL: /api/watchlists/:watchlistId
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "name": "Technology"
    }
    ```

- Successful Response

  - Status Code: 201
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "name": "Technology",
      "userId": 1
    }
    ```

- Error Response: Body validation error

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Validation Error",
      "statusCode": 400,
      "errors": {
        "name": "Name is required",
      }
    }
    ```

- Error response: Couldn't find a Watchlist with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Watchlist couldn't be found",
      "statusCode": 404
    }
    ```

## Delete a Watchlist

Deletes an existing watchlist.

- Require Authentication: true
- Require proper authorization: Watchlist must belong to the current user
- Request

  - Method: DELETE
  - URL: /api/watchlists/:watchlistId
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Successfully deleted",
      "statusCode": 200
    }
    ```

- Error response: Couldn't find a Watchlist with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Watchlist couldn't be found",
      "statusCode": 404
    }
    ```

## Get all Stocks of a Watchlist specified by its id

Returns the stocks of a watchlist specified by its id

- Require Authentication: true
- Request

  - Method: GET
  - URL: /api/watchlist/:watchlistId
  - Body: none

- Successful Response: If you ARE the creator of the watchlist, show all stocks of the watchlist.

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "Stocks": [
        {
          "id": 1,
          "symbol": "APPL",
          "watchlistId": 1
        }
      ]
    }
    ```

- Error response: Couldn't find a Watchlist with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Watchlist couldn't be found",
      "statusCode": 404
    }
    ```

## Add a Stock to a Watchlist specified by symbol

Add a stock to a watchlist specified by symbol.

- Require Authentication: true
- Request

  - Method: POST
  - URL: /api/watchlist/:watchlistId/stocks
  - Headers:
    - Content-Type: application/json
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "symbol": "AAPL"
    }
    ```

- Error response: Couldn't find a Watchlist with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Watchlist couldn't be found",
      "statusCode": 404
    }
    ```

- Error response: Watchlist already has a stock with this id/symbol

- Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Watchlist already has this stock",
      "statusCode": 400
    }
    ```

## Delete a Stock from a Watchlist specified by id

Delete a stock from a watchlist specified by id.

- Require Authentication: true
- Require proper authorization: Current User must be the creator of the watchlist
- Request

  - Method: DELETE
  - URL: /api/watchlist/:watchlistId/stocks/:symbol
  - Headers:
    - Content-Type: application/json
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Successfully deleted stock from watchlist"
    }
    ```

- Error response: Couldn't find a Watchlist with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Watchlist couldn't be found",
      "statusCode": 404
    }
    ```

-Error response: Watchlist does not contain this stock

 - Status Code: 404
  - Headers:
    - Content-Type: application/json
    - Body:

      ```json
      {
        "message": "Watchlist does not contain this stock",
        "statusCode": 404
      }
      ```

- Error response: Only the creator of a watchlist may remove a stock

  - Status Code: 403
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Only the creator of a watchlist may remove a stock",
      "statusCode": 403
    }
    ```

## Get a Users Portfolio specified by User Id

Returns all portfolio transactions of a user, specified by its id

- Require Authentication: true
- Request

  - Method: GET
  - URL: /api/portfolio/:userId
  - Body: none

    ```json
    {
      "Assets": [
        {
          "id": 1,
          "quantityOwned": 10,
          "symbol": "AAPL",
          "totalPurchasePrice": 560.7,
          "userId": 1
       },
       {
          "id": 2,
          "quantityOwned": 70,
          "symbol": "BOX",
          "totalPurchasePrice": 1334.2,
          "userId": 1
       },
     ]
    }
    ```
- Error response: Couldn't find a User with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "User couldn't be found",
      "statusCode": 404
    }
    ```

## Purchase a Stock

User buys a stock and the stock is added to the user's portfolio.

- Require Authentication: true
- Request

  - Method: POST
  - URL: /api/portfolio/:userId/stocks
   - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "userId": 1,
      "symbol": "AAPL",
      "quantity": 2,
      "price": 170
    }
    ```

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "id": 1,
      "symbol": "AAPL",
      "quantity": 2,
      "price": 170
    }
    ```

- Error response: Insufficient Funds

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Insufficient funds",
      "statusCode": 404
    }
    ```

## Sell a Stock

User sells a stock and the stock is removed from the users portfolio.

- Require Authentication: true
- Request

  - Method: DELETE
  - URL: /api/portfolio/:userId/stocks/:symbol
   - Headers:
    - Content-Type: application/json
    - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Successfully sold stock",
      "statusCode": 200
    }
    ```

- Error response: Couldn't find a Stock with the specified symbol that the user owns.

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "You do not own this stock",
      "statusCode": 400
    }
    ```

- Error response: Quantity being sold is greater than quantity owned

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "You can not sell more stock than you own",
      "statusCode": 400
    }
    ```
