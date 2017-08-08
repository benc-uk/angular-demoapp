# Angular Demoapp
This is a demo application written in Angular 4 using [Material Components](https://material.angular.io/). The backend API and server is written in Node.js, the persistent database is [Azure table storage](https://azure.microsoft.com/en-gb/services/storage/tables/)  
The app is based on the ['Tour of Heroes' tutorial](https://angular.io/tutorial) but has been modified and further developed. The default app shows a collection of old 8-bit and 16-bit computers which can be viewed, voted on (liked), and a set of standard CRUD operations performed. The code was designed to be as generic as possible so the base model and services operate on "things", making it easy to change the collection to something else should you wish

The app demonstrates use of the following core aspects:
- Angular 4
- Material Components
- Responsive design with FlexLayout
- Node.js
- Express
- Azure Table Storage

This repo contains three codebases, all of which combine together to make up the complete app:
- **Angular app** - The client/front end written in Angular Typescript and held in the [src folder](src)
- **Server** - Simple Node.js server to host/serve the Angular index.html and JavaScript after they have been built. The source lives in the [server folder](https://github.com/benc-uk/angular-server-azure/tree/749094fb12a59bbd8f9b97021bb26f271dc12697) but is essentially static.  
Note this is a git submodule, pulled in from this [external repo](https://github.com/benc-uk/angular-server-azure) which contains more details on how the server passes config settings from server side environmental variables to the client side Angular app.
- **API backend** - The back end service written in Node.js and held in the [api folder](api). See the [README](api/README.md) there for more information


# Running The Angular Frontend
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.2.6. 
 - Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
 - Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod --aot=false` flag for a production build. For "reasons" AOT doesn't work with how the main app module is currently written.  
 Note running `npm run-script prod` will also build in production mode

> **Note.** When running in local development mode via `ng serve`, a running API instance is not required, instead a 'InMemoryDbService' is used to provide a dummy API. This is controlled by the environment configuration in [this folder](src/environments)


# Running The API 
See the [API readme](api/README.md) for more information on running this component.  
> **Note.** In order to run the API you will first need an Azure Storage account and provide the name and the access key as configuration (see below) 


# Deployment Configuration
When deployed there are three main configuration settings to be aware of:  
*API Component:*
- `APPSETTING_STORAGE_ACCOUNT` - Azure storage account name
- `APPSETTING_STORAGE_KEY` - Access key to the storage account  

*App Component:*
- `APPSETTING_API_ENDPOINT` - Full URL of API endpoint, e.g. `http://my-api-host:8080/things`

In all cases these configuration parameters are set via standard system environmental variables. You can also use a `.env` file which will be picked up.  
Note. The `APPSETTING_` prefix is designed to allow configuration when running in Azure App Services


# Docker
Docker images containing pre-built versions of the app and API are on Dockerhub
- [https://hub.docker.com/r/bencuk/angular-demoapp/](https://hub.docker.com/r/bencuk/angular-demoapp/)
- [https://hub.docker.com/r/bencuk/angular-demoapp-api/](https://hub.docker.com/r/bencuk/angular-demoapp-api/)

Dockerfile for the main app is [here](Dockerfile), the Dockerfile for the API is [here](api/Dockerfile).  
Also provided is a [docker-compose.yml](docker-compose.yml) which can be used to build and run the two containers. It expects four environmental variables `APPSETTING_STORAGE_ACCOUNT`, `APPSETTING_STORAGE_KEY`, `API_HOST`, `API_PORT` (When running locally in Docker, API_HOST will be 'localhost' and API_PORT will be '8080'). Easy way of setting these with Docker Compose is via a `.env` file.


# Azure Templates
Four Azure Resource Manager (ARM) templates are provided, for a range of deployment scenarios. See the [template readme](azure-deploy/README.md) for more details


# Example Architecture (in Azure) 
The overall deployment of the application looks as follows. This shows the application deployed into two Azure App Service applications, however when running in containers the overall topology is the same.
![diagram](https://user-images.githubusercontent.com/14982936/28728279-f3967b24-73bf-11e7-9db4-fc5d41c6fda8.png)