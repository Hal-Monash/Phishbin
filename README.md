# React Express Mongo Template

## UI

This UI was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Local Development

To develop locally, you need at least have [mongodb v4.4](https://docs.mongodb.com/manual/installation/) and [nodejs v14](https://nodejs.org/en/download/) installed. Once dependencies are installed, you need to generate a `.env` file.

### Install dependencies

    yarn install

### Available scripts
#### Run UI in develop env
    yarn ui:dev
#### Run API in develop env
    yarn api:dev
#### Build production UI
    yarn ui:build
#### Run API in production env
    yarn api:start

## Docker

Once Docker has been installed and the configuration file has been created (follow the /docker/config.example). Run the following command in the docker directory to deploy the application locally.

    ./run.sh

The App should be accessible from localhost:3000.
