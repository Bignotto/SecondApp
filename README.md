---
Second App NodeJS Master Class
---


# Second App

**NodeJS MasterClass**

**Thiago Bignotto - May, 2018**

# 1. Purpose
I developed this app to practice knowledge from the NodeJS course. The intention is to memorize the techniques learned from the FirsApp developed in the course. This app will have a ping service, like FirstApp, and will have the ability to CRUD some data.

## The App
This application will store my video games catalog. Create new games, link them with platforms, give them a rating and show the games stored to users using different perspectives.

### App logic
The app use a documents based persistence, like a NoSQL database, but with raw functions writen for this purpose. Each user, game or platform will be a document inside the data folder and all its related information will be stored inside that document.

2. Objects
2.a Games
The game object, represents a game in the collection.
- _ID string
- Name string
- Rating float (0 to 10)
- Platform string
- Description string
- Genre string
- Publisher string

2.b Platform
The platforms where the games run.
- _ID string
- Name string

2.c Users
The usres. This will exist for authentication purposes
- _ID string
- Name string
- Email string
- Password string (hash)

3 User Histories
What users can do with the app.

3.a User actions:
- store a new game in the collection
- view the collection
- edit a game in the collection
- delete a game from the collection
- create account
- login

