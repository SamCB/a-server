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

## Deployment

To deploy. Install everything you're going to need:

```
yarn install
```

You'll need to copy `.env.example.yml` and make a few changes (see the example for details).
You might want to make some changes to `serverless.yml` such as moving to your local `region` (`ap-southeast-2` represet!).

Make sure you've got your AWS credentials all set
(See [here for details](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html)).
And then use serverless to deploy

```
yarn sls deploy
```
