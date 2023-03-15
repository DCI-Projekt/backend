# Kalender API Server

Das Backend Projekt für eine Kalender-Event-App.
User sollen die Möglichkeit haben sich zu registrieren, einzuloggen und an Events teil zu nehmen. Events sollen in einem privaten bzw. öffentlichen Kalender einsehbar sein.

## Installierte HAUPT Packete

- express
- express-validator
- mongoDB
- mongoose
- cors


## API Endpunkte

- **POST** (ADMIN) http://localhost:8080/protected/events - Erstelle ein neues Event 

- **POST** http://localhost:8080/auth/register - Um einen neuen User zu registrieren (ready)
- **POST** http://localhost:8080/auth/login - Um einen User einzuloggen (ready *)

- **GET** http://localhost:8080/auth/events - Um alle Events Daten zu fetchen 

- **PATCH** (ADMIN) http://localhost:8080/protected/user/:id - Um Daten eines bestimmten Users zu ändern 
- **PATCH** (ADMIN) http://localhost:8080/protected/events/:id - Um Daten eines bestimmten Events zu ändern

- **DEL** (ADMIN) http://localhost:8080/protected/user - Um einen User zu entfernen
- **DEL** (ADMIN) http://localhost:8080/protected/event - Um einen Event zu entfernen


## Daten Schemata

User:
```
"username": "Max",
"email": "max@muster.com",
"password": "String",
"role": "admin",
"admin": "true",
"events": [
    "event ID",
    "event ID",
    "event ID"
]

```

Event:
```
"title": "Cook with Claus",
"beginning": "Date",
"duration": "Date",
"description": "Super nice italian pasta food event",
"participant": [
    "user ID",
    "user ID",
    "user ID"
],
"attending": 20

```

Rolle:
```
"name": "User",

```





