# Angular Demoapp
This is a demo application written in Angular 4 using [Material Components](https://material.angular.io/). The backend API and server is written in Node.js, the persistent database is [Azure table storage](https://azure.microsoft.com/en-gb/services/storage/tables/)
The app is based on the ['Tour of Heroes' tutorial](https://angular.io/tutorial) but has been modified and further developed. It's also based on a collection of goats rather than boring old super heroes.

The app demonstrates the following core aspects:
- Angular 4
- Material Components
- Responsive design with FlexLayout
- Node.js
- Express
- Azure Table Storage

This repo contains three projects and codebases, all of which combine together to make up the complete app:
- **Angular app** - The client/front end written in Angular Typescript and held in the [src folder](src)
- **Server** - Simple Node.js server to host/serve the Angular index.html and JavaScript after they have been built. Held in the [server folder](https://github.com/benc-uk/angular-server-azure/tree/749094fb12a59bbd8f9b97021bb26f271dc12697).  
Note this is a git submodule, pulled in from this [external repo](https://github.com/benc-uk/angular-server-azure)
- **API backend** - The back end service written in Node.js and held in the [api folder](api). See the [README](api/README.md) there for more information


# Running The Angular Frontend
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.2.0. 
 - Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
 - Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod --aot=false` flag for a production build. For "reasons" AOT doesn't work with how the main app module is currently written.  
 Note running `npm run-script prod` will also build in production mode

> **Note.** When running in local development mode via `ng serve`, a running API instance is not required, instead a 'InMemoryDbService' is used to provide a dummy API. This is controlled by the environment configuration in [this folder](src/environments)


# Running The API
See the API [README](api/README.md) for more information on running this component.  
> **Note.** In order to run the API you will first need an Azure Storage account and provide the name and the access key as configuration (see below) 

# Deployment Configuration
When deployed there are three main configuration settings to be aware of::  

*API Component:*
- `APPSETTING_STORAGE_ACCOUNT` - Azure storage account name
- `APPSETTING_STORAGE_KEY` - Access key to the storage account  

*App Component:*
- `APPSETTING_API_ENDPOINT` - Full URL of API endpoint, e.g. `http://dummy-api.net:8080/goats`

In all cases these configuration parameters are set via standard system environmental variables. You can also use a `.env` file which will be picked up.  
Note. The `APPSETTING_` prefix is designed to allow configuration when running in Azure App Services

# Azure Templates


# Example Architecture (in Azure) 
Overall deployment of the application looks as follows
![diagram](https://user-images.githubusercontent.com/14982936/28728279-f3967b24-73bf-11e7-9db4-fc5d41c6fda8.png)