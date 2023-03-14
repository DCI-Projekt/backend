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

- **GET** http://localhost:8080/events - Um alle Events Daten zu fetchen


## Daten Schemata

User:
```
"username": "Max",
"email": "max@muster.com",
"password": "String",
"role": "admin",
"admin": "true",
"events": [
    "ID",
    "ID",
    "ID"
]

```

Event:
```
"title": "Cook with Claus",
"beginning": "Date",
"duration": "Date",
"description": "Super nice italian pasta food event",
"participant": [
    "ID",
    "ID",
    "ID"
],
"attending": 20

```

Rolle:
```
"name": "User",

```





