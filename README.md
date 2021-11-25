# 🔥 EventIgnite clone: backend

[See database structure.](https://dbdiagram.io/d/61963e3302cf5d186b5cd49f)

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
