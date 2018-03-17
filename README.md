# A Server

This is a SSSS (Super Simple Super Stupid) api and web interface that I built in a day for an IoT project I was working on.

My goal was an API where I could log in, get a text note, and upload a new one.
It doesn't need to support multiple users.
It doesn't need to support multiple notes.
It doesn't need to be super efficient.
It does need to be cheap.
It does need to be quick to implement.

The result is a AWS Node [serverless](serverless.org) API.
It runs on lambda and uses an S3 bucket for all storage.

The endpoints are:

    GET  /note    - Read the note
    POST /note    - Update the note with the json:
                    { "file": "Updated Text" }

    GET  /app     - Get the HTML endpoint to edit the notes through

Both the /note endpoints take a header: `Auth` which right now is just a password.
Who knows. Maybe someday I'll do it properly.
