# URL Shortener

This is a simple application that will shorten a URL and then retrieve the original URL when you input the shortened version.

## Getting Started

There are two main directories in this repository: the `client` code and the `server` code. You will need to start both to run the application on your local machine.

### Client

The client is a simple react typescript application. This was quickly generated using the `create-react-app` scripts.

To get started, we first need to install all dependencies from the `/client` directory:

```
npm install
```

Then start the application:

```
npm run start
```

The application should open in `localhost:3000`

### Server

Next, we need to start-up the server. In order to do so, you will need the following dependencies installed on your machine:

- [python](https://www.python.org/downloads/)
- [pipenv](https://pypi.org/project/pipenv/)
- [pip](https://pip.pypa.io/en/stable/)

Once you have all dependencies installed, you can start the server.

To start, from the root of the project run:

```
pipenv shell
```

Then, once the virtual environment has started, you can install all dependenies from `requirements.txt`:

```
pip3 install -r requirements.txt
```

Finally, you can start the server:

```
cd /server
python3 app.py
```

Now, you can visit `localhost:3000` in your browser and start shortening your URLs!
