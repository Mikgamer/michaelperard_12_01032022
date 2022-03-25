# SportSee

![React Version](https://img.shields.io/badge/React-v17.0.2-blue.svg)
![D3 Version](https://img.shields.io/badge/D3-v7.3.0-purple.svg)
![PropTypes Version](https://img.shields.io/badge/PropTypes-v15.8.1-green.svg)
<img  src="https://user.oc-static.com/upload/2020/08/18/15977560509272_logo%20%285%29.png" height="20" alt="Logo  SportSee" align="top">

#### SportSee is a startup dedicated to sports coaching, this code is the new version of the user profile page of the website

## Table of content

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Launching the project](#launching-the-project)
  - [To access the users profile page](#to-access-the-users-profile-page)
- [Scripts](#scripts)
- [Built With](#built-With)

## Getting Started

### Prerequisites

- [NodeJS (version 16)](https://nodejs.org)
- [npm](https://www.npmjs.com) or [Yarn](https://yarnpkg.com/)

### Launching the project

1. This website use a [Backend](https://github.com/OpenClassrooms-Student-Center/P9-front-end-dashboard), follow [these instructions](https://github.com/OpenClassrooms-Student-Center/P9-front-end-dashboard/blob/master/README.md) beforehand

2. Clone it on your computer.

3. Use `npm i` or `yarn` to download node modules

4. Use `npm start` or `yarn start` to run the website (see [Scripts](#scripts) for other options)

### To access the users profile page

You can access each user profile page with : `http://localhost:3003/user/${userId}`

If the `userId` is invalid, the user profile will be empty, any other link will be redirected to `http://localhost:3003/user/12`

**Warning, currently only two users have been mocked. They have `userId` `12` and `18` respectively.**

## Scripts

In the project directory, you can run :

#### `npm start` or `yarn start`

Runs the app in development mode. Open [http://localhost:3003](http://localhost:3003) to view it in the browser.

#### `npm run build` or `yarn build`

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

## Built With

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
