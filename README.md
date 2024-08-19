# URL Shortener

This is a simple application that will shorten a URL and then retrieve the original URL when you input the shortened version.

## Getting Started

There are two main directories in this repository: the `client` code and the `server` code. You will need to start both to run the application on your local machine.

### Client

First, we need to install all dependencies from the `/client` directory:

```
npm install
```

Then start the application:

```
npm run start
```

The application should open in `localhost:3000`

### Server

Next, we need to start-up the server. In order to do so, you will need [python](https://www.python.org/downloads/) installed on your machine.

Once you have all dependencies installed, you can start the flask server by running the following from `/server`:

```
python3 app.py
```

Now, you can visit `localhost:3000` in your browser and start shortening your URLs.
