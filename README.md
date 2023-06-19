
# scratchpay

  

Coding Challenge for Clinic Search

  

## Usage

  

- npm install

- .env.example => .env

- npm run start

  

## Features

  

- API for getting and searching for clinics

## Documentation

  

the API is `http://localhost:3000/clinic` will return all clinics

  

#### - Params

-  `name=Mayo` will filter for any clinic "contains" this name

-  `state=Florida` will filter by state equal "Florida" or state code equal "FL"

-  `availability[from]=10:00&availability[to]=24:00` will filter by availability for clinics with availability before`10:00` and after `24:00`

  

This is including search by multiple criteria in the same time

## Structure

```bash
scratchpay
├───src
│   ├───config # environment variables, swagger config
│   modules # group related modules together
│   │   └───module
│   │       ├───index.ts # exports the things in the module
│   │       ├───module.controller.ts # controllers called in routes
│   │       ├───module.model.ts # typescript object interface
│   │       ├───module.repository.ts # handles database access
│   │       ├───module.routes.ts # handles incoming traffic
│   │       └───module.service.ts # business logic between controller and database access
│   ├───middlewares # global middlewares, used by many routes
│   └───utils # global utilities, used in many places
│   ├───constants # global constanst
└───test # structure mimics src directory structure
```

  

## Testing

  

Testing is done using the Jest framework. run `npm run test` to activate the test framework. By default, tests are stored in the `test` directory which mimics the structure of the `src` directory.