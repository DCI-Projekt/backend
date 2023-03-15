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

- **POST** http://localhost:8080/protected/events - Erstelle ein neues Event (ADMIN)

- **POST** http://localhost:8080/auth/register - Um einen neuen User zu registrieren
- **POST** http://localhost:8080/auth/login - Um einen User einzuloggen

- **GET** http://localhost:8080/auth/events - Um alle Events Daten zu fetchen

- **PATCH** http://localhost:8080/protected/user/:id - Um Daten eines bestimmten Users zu ändern (ADMIN)
- **PATCH** http://localhost:8080/protected/events/:id - Um Daten eines bestimmten Events zu ändern (ADMIN)

- **DEL** http://localhost:8080/protected/user - Um einen User zu entfernen (ADMIN)
- **DEL** http://localhost:8080/protected/event - Um einen Event zu entfernen (ADMIN)


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





