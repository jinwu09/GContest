- [user](#user)
  - [Create](#create)
    - [Create User](#create-user)
  - [Read](#read)
    - [Login or auth](#login-or-auth)
  - [Update](#update)
  - [Delete](#delete)
- [quiz](#quiz)
  - [Create](#create-1)
    - [Create quiz](#create-quiz)
    - [Create question](#create-question)
    - [Create Choice](#create-choice)
  - [Read](#read-1)
    - [show all quizes](#show-all-quizes)
  - [Update](#update-1)
  - [Delete](#delete-1)

# user
## Create
### Create User
Link:
```
http://localhost:8080/user/register
```
Request:
```JSON
{
  "first_name": "Albert",
  "last_name": "Santos",
  "username": "Jinwusan",
    // school is optional/null 
  "school": "",
  "email": "2020115801@gordoncollege.edu.ph",
  "password": "secret password"
}
```
Response:
```JSON
{
  "data": {
    "payload": "successfully created user",
    "date": "2023/2/11 10:47:26 GMT+0800 (Philippine Standard Time)"
  }
}
```
## Read
### Login or auth
Link:
```
http://localhost:8080/user/login
```
Request:
```JSON
{
  "email": "202011580@gordoncollege.edu.ph",
  "password": "secret password"
}
```
Response:
```JSON
{
  "data": {
    "payload": {
      "message": "successfully logged-in user",
      "token": "7eb864e6-4e8d-4948-add2-b1a41cb1a715"
    },
    "date": "2023/2/11 10:49:47 GMT+0800 (Philippine Standard Time)"
  }
}
```
## Update
## Delete

# quiz
## Create
### Create quiz 
```
http://localhost:8080/quiz/create_quiz
```
Method: post
Request:
```JSON
{
  "token":"7eb864e6-4e8d-4948-add2-b1a41cb1a715",
  "title":"sobra daw ng zero meow2",
  //optional password can be null
  "password":"",
  // optional room can be null
  "room":"", 
  "status":"doing something",
  "start_at":"2023-03-06T12:23:00.000z",
  "ends_at":"2023-03-07T14:22:21.000z"
}
```
Response:
```JSON
{
  "data": {
    "status": 201,
    "payload": "quiz created",
    "date": "2023/2/13 01:15:28 GMT+0800 (Philippine Standard Time)"
  }
}
```
### Create question
```
http://localhost:8080/quiz/create_question
```
Method: post
Request:
```JSON
{
  "token":"abaed2c3-d336-4996-84c7-d15833deadaf",
  "content":"testing question is this albert",
  "score":1,
  "quizID":"4295753d-cf23-4ab8-9ffc-878d1b2873f0"
}
```
Response:
```JSON
{
  "data": {
    "payload": "successfully made",
    "date": "2023/2/13 02:42:33 GMT+0800 (Philippine Standard Time)"
  }
}
```
### Create Choice
```
http://localhost:8080/quiz/create_choice
```
Method: post
Request:
```JSON
{
  "token":"abaed2c3-d336-4996-84c7-d15833deadaf",
  "questionID":"b99e798b-21f6-4926-89ce-2c4ce410d21b",
  "content":"is albert true meow",
  "is_correct":true
}
```
Response:
```JSON
{
  "data": {
    "payload": {
      "message": "Choice successfuly made",
      "isCreated": true
    },
    "date": "2023/2/13 02:42:33 GMT+0800 (Philippine Standard Time)"
  }
}
```

## Read
### show all quizes
```
http://localhost:8080/quiz/show_quizes
```
Method: GET
Request:
```JSON
{
  "token":"abaed2c3-d336-4996-84c7-d15833deadaf"
}
```
Response:
```JSON
{
  "data": {
    "payload": [
      {
        "id": "4295753d-cf23-4ab8-9ffc-878d1b2873f0",
        "title": "sobra daw ng zero meow2",
        "password": "",
        "room": "3cf15f1d-0275-45e0-b50f-b6091e4880d6",
        "status": "doing something",
        "creator_id": "54ff03d4-3f59-4b26-8868-2e05f4f7ea4f",
        "created_at": "2023-03-12T18:43:34.282Z",
        "start_at": "2023-03-06T12:23:00.000Z",
        "ends_at": "2023-03-07T14:22:21.000Z",
        "question": [
          {
            "id": "b99e798b-21f6-4926-89ce-2c4ce410d21b",
            "content": "testing question is this albert",
            "score": 1,
            "quizId": "4295753d-cf23-4ab8-9ffc-878d1b2873f0",
            "choice": []
          }
        ]
      },
      {
        "id": "cceafab1-165e-4f83-b4b0-b52f26c37483",
        "title": "all about me",
        "password": "",
        "room": "idk",
        "status": "closed",
        "creator_id": "54ff03d4-3f59-4b26-8868-2e05f4f7ea4f",
        "created_at": "2023-03-12T18:42:58.968Z",
        "start_at": "2023-03-12T18:42:58.965Z",
        "ends_at": "2023-03-12T18:42:58.965Z",
        "question": [
          {
            "id": "1ba68558-918f-45d2-bdc0-1d1f12cd391c",
            "content": "meow",
            "score": 1,
            "quizId": "cceafab1-165e-4f83-b4b0-b52f26c37483",
            "choice": [
              {
                "id": "aa410590-462b-473e-b5d8-8d229a9c92cb",
                "content": "meow no",
                "is_correct": false,
                "questionId": "1ba68558-918f-45d2-bdc0-1d1f12cd391c"
              },
              {
                "id": "ba17c814-13c5-4997-9231-3f54247d33c9",
                "content": "meow i don't know",
                "is_correct": false,
                "questionId": "1ba68558-918f-45d2-bdc0-1d1f12cd391c"
              },
              {
                "id": "f24eb3de-f6d4-428e-90ef-559be5879cb1",
                "content": "meow yes",
                "is_correct": true,
                "questionId": "1ba68558-918f-45d2-bdc0-1d1f12cd391c"
              }
            ]
          }
        ]
      }
    ],
    "date": "2023/2/13 02:42:33 GMT+0800 (Philippine Standard Time)"
  }
}
```
## Update
## Delete