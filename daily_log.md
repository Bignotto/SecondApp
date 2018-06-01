---
Main log for the project
---

### 2018/05/21
Started this practice app to learn JavaScript and NodeJS.

### 2018/05/25
Started this log.

Finished data.js: create new file, write to a file and delete a file is now working. The logic for updating the documents will be in some other place. I think that will be possible to use it like a NoSQL database.

### 2018/05/25
Starting to create the routes for each object.

I've became using a _ in front of variable names that is an object inside the lib folder of the project. So it will identify what is a library from what is a single object variable. 

Just tested the routing strategy. It worked. There is just a ping route but it returned 200 when path is ping and 404 when it is not. Now I have to start writing handlers for user input for platforms.

### 2018/05/26
Watched class 25 - Tokens

Implemented the tokens service. The idea behind the tokens service is to create a token for a session each time the users logs in. So it is possible to check if there is a valid token for the user when dealing with the data.

The strategy to send the token across requests is to embed it in the request headers.

### 2018/05/28
Implementing users persistence. 

The POST and GET fuctions are done. Need to pay more atention to variables names. As the VSC and JS works diferent from others IDEs and programming languages. Variables are quite different in JavaScript.

The PUT and DELETE functions are done.

Now starting to implement user authentication using the token strategy from the class I watched yesterday. The strategy is to create a token object with login information, not password, but a session id and an expiration time. If the user tryies to do something like edit or delete something it is possible to check the user session without the need of keep sending the password.

  >Tonight's goals:
>* implement POST, GET, UPDATE, DELETE for token service.
 >- [x] POST
 >- [x] GET
 >- [x] PUT
 >- [x] DELETE

### 2018/05/29
Implemented POST and GET for the tokens last night. Now the PUT function is working. Finishing DELETE.

*PUT and DELETE were made without any bugs!* They just worked.

Now start making the login and user control. First modify user methods to check if there is a token for that session.

### 2018/05/30

Tests are becoming more complex, and there won't be interface tests. The only way to test is using Postman. For now. Maybe I'll make a mobile app to use this API.

Finished refactoring the User.GET method to verify if the user has a valid token to actualy get the information.

>Tonight's Goals:
>* Refactor other User methods to check for a valid token:
>- [x] GET
>- [x] PUT
>- [x] DELETE
>
> Goal Achieved! 22:30

Refactored the Token.DELETE function to delete the user token when deleting a user. The token wont be useful anymore.

Starting to implement other objects persistence. Starting with "Platform".

Starting to use GitHub. It is about time for me to learn about branches and pull requests. It is way more easier than I thought.

### 2018/05/31

Starting a new branch for implementing platform persistence.

Got some trouble dealing with dates. 

Some ToDos:
- [x] delete expired tokens automaticaly
- [ ] explain better the token strategy inside the README file