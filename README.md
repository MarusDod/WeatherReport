# Weather Report

[Webpage](https://wreport.onrender.com)

[GraphQL Playground](https://wreport-graphql.onrender.com/graphql)


Simple fullstack project using typescript, express, graphql, redis and react. It fetches data from openweathermap.org and displays it on a web page

## Clone

```bash
$ git clone git@github.com:MarusDod/WeatherReport.git
```

## Setup backend

Install dependencies

```bash
$ cd backend
$ yarn
```

setup .env

```
OPENWEATHER_API=
REDIS_URL=
REDIS_AUTH=
SESSION_SECRET=
```

Compile and Run

```bash
$ yarn run compile
$ yarn run serve
```

## Setup frontend

```bash
$ cd frontend
$ yarn
$ yarn run codegen
$ npm run start