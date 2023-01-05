# Weather Report

Quick fullstack project to fetch data from openweathermap.org and display it on a web page 

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
$ npm run compile
$ npm run serve
```

## Setup frontend

```bash
$ cd frontend
$ yarn
$ yarn run codegen
$ npm run start