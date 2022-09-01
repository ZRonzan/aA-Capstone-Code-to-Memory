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
      "email": "demo@aa.io"
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

## Get all Classes created by the user

Return all the classes created by the user.

- Require Authentication: true
- Request

  - Method: GET
  - URL: /api/classes/current-user-classes
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {

    }
    ```

## Create a Class

Creates and returns a new class.

- Require Authentication: true
- Request

  - Method: POST
  - URL: /api/classes
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {

    }
    ```

- Successful Response

  - Status Code: 201
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {

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

      }
    }
    ```

## Edit a class

Updates and returns an edited class.

- Require Authentication: true
- Require proper authorization: Class must belong to the current user
- Request

  - Method: PUT
  - URL: /api/classes/:classId
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {

    }
    ```

- Successful Response

  - Status Code: 201
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {

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

      }
    }
    ```

- Error response: Couldn't find a Class with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Class couldn't be found",
      "statusCode": 404
    }
    ```

## Delete a class
Deletes an existing class.

- Require Authentication: true
- Require proper authorization: Class must belong to the current user
- Request

  - Method: DELETE
  - URL: /api/classes/:classId
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

- Error response: Couldn't find a Class with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Class couldn't be found",
      "statusCode": 404
    }
    ```

## Get all Decks of a Class specified by its id

Returns the decks of a class specified by its id

- Require Authentication: true
- Request

  - Method: GET
  - URL: /api/classes/:classId/decks
  - Body: none

- Successful Response: If you are the creator of the class, show all decks of the class.

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "Decks": [
        {
          "id": 1,
          "name": "my deck",
          "objective": "deck description"
        }
      ]
    }
    ```

- Error response: Couldn't find a class with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Class couldn't be found",
      "statusCode": 404
    }
    ```

## Add a Deck to a Class specified by its id

Add a deck to a class specified by its Id.

- Require Authentication: true
- Request

  - Method: POST
  - URL: /api/classes/:classId/decks
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
      "name": "deck name",
      "objective": "deck objective"
    }
    ```

- Error response: Couldn't find a Class with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Class couldn't be found",
      "statusCode": 404
    }
    ```

- Error response: Class already has a deck with this id

- Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Class already has this deck",
      "statusCode": 400
    }
    ```

## Edit a Deck

Updates and returns an edited Deck.

- Require Authentication: true
- Require proper authorization: Deck must belong to the current user
- Request

  - Method: PUT
  - URL: /api/classes/:classId/decks/:deckid
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {

    }
    ```

- Successful Response

  - Status Code: 201
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {

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

      }
    }
    ```

- Error response: Couldn't find a Deck with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Deck couldn't be found",
      "statusCode": 404
    }
    ```

## Delete a Deck from a Class specified by id

Delete a deck from a class specified by id.

- Require Authentication: true
- Require proper authorization: Current User must be the creator of the class
- Request

  - Method: DELETE
  - URL: /api/classes/:classId/decks/:deckId
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
      "message": "Successfully deleted deck from class"
    }
    ```

- Error response: Couldn't find a Class with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Class couldn't be found",
      "statusCode": 404
    }
    ```

-Error response: Class does not contain this deck

 - Status Code: 404
  - Headers:
    - Content-Type: application/json
    - Body:

      ```json
      {
        "message": "Class does not contain this deck",
        "statusCode": 404
      }
      ```

- Error response: Only the creator of a class may remove a deck

  - Status Code: 403
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Only the creator of a class may remove a deck",
      "statusCode": 403
    }
    ```

## Get all Cards of a Deck specified by its id

Returns the decks of a class specified by its id

- Require Authentication: true
- Request

  - Method: GET
  - URL: /api/decks/:deckId/cards
  - Body: none

- Successful Response: If you are the creator of the deck, show all cards of the deck.

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "Decks": [
        {
          "id": 1,
          "question" : "question",
          "answer": "answer",
          "deck_id": 1
        }
      ]
    }
    ```

- Error response: Couldn't find a deck with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "deck couldn't be found",
      "statusCode": 404
    }
    ```

## Add a Card to a Deck specified by its id

Add a deck to a class specified by its Id.

- Require Authentication: true
- Request

  - Method: POST
  - URL: /api/decks/:deckId/cards
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
      "question" : "question",
      "answer": "answer",
    }
    ```

- Error response: Couldn't find a Class with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Deck couldn't be found",
      "statusCode": 404
    }
    ```

## Edit a Card

Updates and returns an edited Card.

- Require Authentication: true
- Require proper authorization: Deck must belong to the current user
- Request

  - Method: PUT
  - URL: /api/decks/:deckid/cards/:cardId
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {

    }
    ```

- Successful Response

  - Status Code: 201
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {

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

      }
    }
    ```

- Error response: Couldn't find a Card with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Card couldn't be found",
      "statusCode": 404
    }
    ```

## Delete a Card from a Deck specified by id

Delete a card from a deck specified by id.

- Require Authentication: true
- Require proper authorization: Current User must be the creator of the deck
- Request

  - Method: DELETE
  - URL: /api/decks/:deckId/cards/:cardId
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
      "message": "Successfully deleted card from deck"
    }
    ```

- Error response: Couldn't find a deck with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Deck couldn't be found",
      "statusCode": 404
    }
    ```

-Error response: Deck does not contain this Card

 - Status Code: 404
  - Headers:
    - Content-Type: application/json
    - Body:

      ```json
      {
        "message": "Deck does not contain this Card",
        "statusCode": 404
      }
      ```

- Error response: Only the creator of a deck may remove a card

  - Status Code: 403
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
      "message": "Only the creator of a deck may remove a card",
      "statusCode": 403
    }
    ```
