# 🔥 EventIgnite clone: backend

[See database structure of the first part.](https://dbdiagram.io/d/61a713a48c901501c0daaf2a)

## Installation

```bash
$ yarn install
```

## Usage

Copy the example env file and make the required configuration changes in the .env file

For example:

```bash
$ cp env.example .env
```

## Running the app

Run migrations first:

```bash
$ yarn migration:run
```

After:

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```
