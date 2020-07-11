# fancy-todo

## Fancy Todo App Server

Fancy Todo App is an application to show our todo list in a fancy way!
This app has :

RESTful endpoint for asset's CRUD operation
JSON formatted response
 

## Todos RESTful endpoints: 
## GET /todos
Get all todos

- Request Header:
```json
{
    "access_token": "<your access token>"
}
```   

- Request Body:
```json
  not needed
```

- Response (200 - OK):
```json
[
  {
    "id": 1,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due date>",
    "createdAt": "2020-07-06T07:15:12.149Z",
    "updatedAt": "2020-07-06T07:15:12.149Z",
  },
  {
    "id": 2,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due date>",
    "createdAt": "2020-07-06T07:15:12.149Z",
    "updatedAt": "2020-07-06T07:15:12.149Z",
  }
]
```

- Response (400 - Bad Request):
```json
{
    "message": "Invalid request"
}
```

- Response 500: Internal server error
```json
{
    "message": "Internal Server Error"
}
```

## POST /todos
Create new todo (+ automatically generated QR-Code from 3rd Party API)

- Request Header:
```json
{
    "access_token": "<your access token>"
}
```

- Request Body:
```json
{
    "title": "<title to get insert into>",
    "description": "<description to get insert into>",
    "status": "<status to get insert into>",
    "due_date": "<due to get insert into>"
}
```

- Response (201 - Created):
```json
{
    "resultQR": "http://qrcode.youlikeshare.com/qrcode_images/202007/a065d61574ca165c5897b09d03661d50_1.png",
    
    "todo": {
        "id": "<given id by system>",
        "title": "<posted title>",
        "description": "<posted description>",
        "status": "<posted status>",
        "due_date": "<posted due date>",
        "createdAt": "2020-07-06T07:17:12.149Z",
        "updatedAt": "2020-07-06T07:17:12.149Z"
    }
}   
```

- Response (400 - Bad Request):
```json
{
    "message": "Invalid requests"
}
```

- Response 500: Internal server error
```json
{
    "message": "Internal Server Error"
}
```

## GET /todos/:id
Get todo by request id params

- Request Header:
```json
{
    "access_token": "<your access token>"
}
```

- Request Body:
```json
  not needed
```

- Response (200 - OK):
```json
{
    "id": 1,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due date>",
    "createdAt": "2020-07-06T07:15:12.149Z",
    "updatedAt": "2020-07-06T07:15:12.149Z",
}
```

- Response (400 - Bad Request):
```json
{
    "message": "Invalid Request"
}
```

- Response (404 - Not Found):
```json
{
    "message": "Id Todo Not Found"
}
```

- Response 500: Internal server error
```json
{
    "message": "Internal Server Error"
}
```

## PUT /todos/:id
Update todo by request id params

- Request Header:
```json
{
    "access_token": "<your access token>"
}
```

- Request Body:
```json
{
    "title": "<title value to be updated>",
    "description": "<description value to be updated>",
    "status": "<status value to be updated>",
    "due_date": "<due date value to be updated>"
}
```

- Response (200 - OK):
```json
{
    "message": "Succesfully Updated Todo!",
}
```

- Response (400 - Bad Request):
```json
{
    "message": "Invalid requests"
}
```

- Response (404 - Not Found):
```json
{
    "message": "Id Todo Not Found"
}
```

- Response 500: Internal server error
```json
{
    "message": "Internal Server Error"
}
```

## DELETE /todos/:id
Delete todo by request id params

- Request Header:
```json
{
    "access_token": "<your access token>"
}
```

- Request Body:
```json
    not needed
```

- Response (200 - OK):
```json
{
    "message": "Succesfully Deleted Todo!",
}
```

- Response (400 - Bad Request):
```json
{
    "message": "Invalid requests"
}
```

- Response (404 - Not Found):
```json
{
    "message": "Id Todo Not Found"
}
```

- Response (500 - Internal server error)
```json
{
    "message": "Internal Server Error"
}
```

## Users RESTful endpoints: 

## POST /users/register
Create new user

- Request Header
```json
    not needed
```
- Request Body

```json
{
    "name": "<name to get insert into>",
    "email": "<email to get insert into>",
    "password": "<password to get insert into>"    
}
 ```

- Response (201 - Created)
```json
{
    "id": 10,
    "name": "newuser",
    "email": "user@mail.com",
    "password": "$2b$10$vXKvM7FIz7WkwlarD.a1u.6rW7JNGTwWQtRXyUx/SSaCvaxg2vqze",
    "updatedAt": "2020-07-10T14:04:12.904Z",
    "createdAt": "2020-07-10T14:04:12.904Z"
}
```

- Response (400 - Bad Request)
```json
{
    "type": "Bad Request",
    "errors": 
    [
        { "message": "name cannot be empty" },
        { "message": "email cannot be empty"},
        { "message": "password cannot be empty"}
    ]
}
```

- Response (500 - Internal server error)
```json
{
    "message": "Internal Server Error"    
}
```

## POST /users/login
login to user's account

- Request Header
```json
    not needed
```

- Request Body
```json
{
    "email": "<email user>",
    "password": "<password user>"
}
```

- Response (200 - OK)
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJtYXlhbmFAZW1haWwuY29tIiwibmFtZSI6Im1heWEiLCJpYXQiOjE1OTQzNjQxNTB9.RgwDwM4MYu5_6x1nQrJ_CKj44-WkR32ZM6_dBZItp9w"
}
```

- Response (400 - Bad Request)
```json
{
    "errors": [ { "message": "Invalid email/password"} ]
}
```

- Response (500 - Internal server error)
```json
{
    "message": "Internal Server Error"    
}
```

## POST /users/googleSignIn
login to user's account through third-party API (google)

- Request Header
```json
    not needed
```

- Request Body
```json
{
    "email": "<user's email>",
    "password": "<user's password>"
}
```

- Response (200 - OK)
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJtYXlhbmFAZW1haWwuY29tIiwibmFtZSI6Im1heWEiLCJpYXQiOjE1OTQzNjQxNTB9.RgwDwM4MYu5_6x1nQrJ_CKj44-WkR32ZM6_dBZItp9w"
}
```

- Response (400 - Bad Request)
```json
{
    "errors": [ { "message": "Invalid email/password"} ]
}
```

- Response (500 - Internal server error)
```json
{
    "message": "Internal Server Error"    
}
```

## env files:

```json
SECRET=jwtSECRET
CLIENT_ID = 720801184011-udt368v81e32tg84ia4tt26c8hq3tk6h.apps.googleusercontent.com
APIMAILGUN = 9b7596b46abeac286bf4f9f889f717ed-87c34c41-d92c8141
DOMAINMAILGUN = sandbox1da9ff426ccb40b2a6412ed01470f329.mailgun.org
```