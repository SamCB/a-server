# A Server

This is a SSSS (Super Simple Super Stupid) api and web interface that I built in a day and a half for an IoT project I was working on.

My goal was an API where I could log in, get a text note, and upload a new one.
It doesn't need to support multiple users.
It doesn't need to support multiple notes.
It doesn't need to be super efficient.
It does need to be cheap.
It does need to be quick to implement.

The result is a AWS Node [serverless](serverless.org) API.
It runs on lambda and uses an S3 bucket for all storage.

The endpoints of the API are:

    GET  /note    - Read the note
    POST /note    - Update the note with the json:
                    { "file": "Updated Text" }

Both the /note endpoints take a header: `auth` which right now is just a password.
Who knows. Maybe someday I'll do it properly.

This is all serviced by a simple web app built in [react](reactjs.org).
It's not a very well designed app.
I'm new to react so I probably didn't do everything quite right.
Again, maybe one day I'll come through and try fixing it up.

## Structure

There are two directories in this project.

- `/api` - A serverless api
- `/app` - The React app

## Dependencies

All you need for production is:

- [node](nodejs.org);
- [yarn](yarnpkg.com); and
- [aws cli](https://aws.amazon.com/cli/)

You'll probably be able to get away with [npm](npmjs.com) if you prefer it to yarn but I haven't tried it.

If you want to run the API locally then you'll also need:

- [docker](https://www.docker.com/); and
- [docker-compose](https://docs.docker.com/compose/)

Which are both used for handling AWS behaviour.

## Run locally

### API

Firstly setup your `.env` variables by copying `.env.example.yml` to `.env.yml`.
Then follow the instructions to configure as you see fit.

Then to launch the API locally, in a terminal,

```
cd api
yarn install
```

And to get the API running:

```
yarn start
```

This will startup localstack through docker to act in place of the s3 bucket.
This will also start the API up on `http://localhost:3000`.

### App

In another terminal, install everything required.

```
cd app
yarn install
```

Then to run the app in developer mode

```
yarn start
```

This will startup the webapp at `http://localhost:3030`.
Any changes you make to the app will cause the client to restart.

## Deployment

If you've already run locally, not all of these steps will be necesarry.

### Deploy API

The first thing to deploy is the API.

```
cd api
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

If successful, you should see the some details printed to console, including the endpoints:

```
endpoints:
  GET - https://<some-val>.execute-api.<your-region>.amazonaws.com/prod/note
  POST - https://<some-val>.execute-api.<your-region>.amazonaws.com/prod/note
```

You can use a tool like [Insomnia](https://insomnia.rest/) or [Postman](https://www.getpostman.com/) to validate your api.

When that is done, it's time to deploy the app.

### Deploy App to S3

First thing you'll need to do is set the environment variables for production:

- Copy `app/.env.production.example` to `app/.env.production`.
- Then change the `REACT_APP_API` variable to the endpoint that `serverless` printed without the `/note` at the end. (See the variable in the example file).

Then you're ready to build and push to s3.

Firstly, create a bucket to store your website in.
This will be easiest via the AWS s3 control panel.

Essentially name the bucket whatever you want, but make sure that:

- Bucket Policy is set to:
    ```
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "PublicReadForGetBucketObjects",
                "Effect": "Allow",
                "Principal": "*",
                "Action": "s3:GetObject",
                "Resource": "arn:aws:s3:::aserver-prod-app/*"
            }
        ]
    }
    ```
- Static website hosting is enabled with both index and error docs set to `index.html`

```
cd app
yarn build
aws s3 sync build/ s3://<name of your bucket>
```

Once it's built and uploaded, you should be able to access the app via the url provided when you enabled static website hosting from your bucket.

### Adding ssl

As a pretty easy bonus. SSL can be added by going to the cloudfront console.

Add a web based distribution with the following settings:

- Web delivery method
- Set your app bucket as the _"Origin Domain Name"_
- Set _"Compress Objects Automatically"_ to "yes"
- Set the _"Default Root Object"_ to `index.html`

Then create the distribution.

This will take a while to be set, but once the _"Status"_ column in the Cloudfront Distributions table is set to _"Deployed"_ then you're good to go.
Visit the provided url and see your website live!

### Adding your own domain name

You could do this. But I didn't. So I'm not covering it here.

Shouldn't be too hard though.

## Future Work

I'm not too interested in working more on this now.
But who knows.
I might need something more complicated for some future IoT project.
So there are a few things that could come up.
Some improvements might include:

- [ ] An actual database instead of S3
- [ ] Proper authentication (proper tokens)
- [ ] Multiple users
- [ ] Multiple notes per user
- [ ] Actually writing the react frontend properly
