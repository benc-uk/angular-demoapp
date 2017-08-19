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

This repo contains two main codebases, which combine together to make up the complete app:
- **Angular app** - The Angular 4 client/frontend written in Typescript, generated via the Angular CLI and held in the [src folder](src)
- **API and server** - The backend server written in Node.js using Express, this performs two functions:
  - REST API which the Angular app makes calls to for all CRUD data operations
  - Hosting the Angular app, serving *index.html* and associated static content to clients

### Screenshot of running application
![screenshot](https://user-images.githubusercontent.com/14982936/29248453-69f0f34c-8010-11e7-85bc-00357a80cd80.png)

# Running Locally In Development Mode
To run the app locally in development mode there are two options: 
- Run `ng serve` to launch the Angular CLI dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
- To run from the Node server, first run `npm run build-dev` to build the project in dev mode. The build artifacts will be stored in the `dist-dev` directory. Set the environmental variable `NODE_ENV` to `development`, then launch the server with the command `node server-api/server.js ./dist-dev` or from the **sever-api** folder run `npm run start-dev`. There is very little to be gained in running it locally in this fashion over using the `ng serve` method.

In either case a in-memory database will be used, via an instance of **InMemoryDbService**, which also intercepts all API calls. This means that no Azure Storage account is required, and the app can be run totally standalone and offline
 
# Deployment & Production Mode
In order to deploy fully and run in production mode with the proper API backend you will need to carry out some steps to build & deploy. You will also need an [Azure Storage account](https://azure.microsoft.com/en-gb/services/storage/) and the access key for the account, the details of setting that up are outside the scope of this readme.  

The Angular app is "production mode aware" - so that a real HTTP requests (via XHR) are sent through to a "real" external service only when in prod mode. When in dev mode, all HTTP requests are intercepted by the an memory service. This is handled by the [**AppHttpModule**](/src/app/app-http.module.ts) module

### Configuration
There are two main configuration parameters both relating to the Azure Storage account where the data is held in NOSQL [Table Storage](https://azure.microsoft.com/en-gb/services/storage/tables/). These are:
- `APPSETTING_STORAGE_ACCOUNT` - Azure storage account name
- `APPSETTING_STORAGE_KEY` - Access key to the storage account

The server will load these from environmental variables. When running locally [dotenv](https://www.npmjs.com/package/dotenv) can be used, which uses a file called `.env` with in key=value format, one line per key/value pair.  
When deployed in Azure App service, you can set these values securely as [App Settings](https://docs.microsoft.com/en-us/azure/app-service-web/web-sites-configure). When doing so you do not need to include the "APPSETTING_" prefix

### Angular Build
Simply run `ng build --prod` or `npm run build-prod` to build the Angular app to the standard `dist` output directory.

### Packaging with Server 
Putting the app together for deployment requires the following steps:
- Copy the `server-api/server.js`, `server-api/initdata.json` & `server-api/package.json` to the root of where your app will run or be deployed
- From this app deployment root directory, run `npm install` to pull down dependencies for the server. Note. We are not interested in the `package.json` that lives at the root of this repo, that is for the Angular dev environment
- The Node/Express server will serve the contents of the `public/` folder as static content so copy the built Angular app there. Recursively copy the contents of the `dist\*` directory to the app deployment root `public` subdirectory

The contents of the deployed app folder should look as follows
```
/
  node_modules/
  server.js
  package.json
  public/
    assets/
    index.html
    <various js & css files>
```

### Running 
Assuming the configuration environmental variables described above are set and also `NODE_ENV` is set to `production` run the server from the app deployment directory with `npm start`

### Database/Azure Table Initialization
After deployment the Azure Table will need to be created & populated with data, or the API and app will not function. When you visit the site you will probably see the Angular app load but just get a spinner.  
Initializing the db can be done with an API call hitting the following URL `http://<app-srv-address:3000/api/initdb` and waiting approx 10 seconds. You can call this at anytime to reset the data to starting state. The starting data is held in `server-api/initdata.json`

---

# Docker
A Docker images containing pre-built versions of the app are available on Dockerhub
- [https://hub.docker.com/r/bencuk/angular-demoapp/](https://hub.docker.com/r/bencuk/angular-demoapp/)

> Note. Two sets of tags are provided, the `:latest` and `:prod` tags are the app built in production mode (requiring an Azure Storage account), `:dev` tag is built in development mode (so works standalone)

[Dockerfile](Dockerfile) and [Docker Compose](docker-compose.yml) files are provided with this repo, the files suffixed with `dev` build/run the app in development mode, the unsuffixed files build/run in prod mode.  
Note. The Dockerfile expects that the `dist` / `dist-dev` output directory has been created (via the `ng build` step) **prior** to running the `docker build`

Running the Docker container from the production image requires `APPSETTING_STORAGE_ACCOUNT`, `APPSETTING_STORAGE_KEY` environmental variables passed to the container at start or it will fail. The same variables are expected by the `docker-compose.yml` file, which can be set via a `.env` file 

---

# Azure Templates
Four Azure Resource Manager (ARM) templates are provided, for a range of deployment scenarios. See the [template readme](azure-deploy/README.md) for more details


# Example Architecture (in Azure) 
The overall deployment of the application looks as follows. This shows the application deployed into an Azure App Service web app, however when running in containers the overall topology is broadly the same.
![diagram](https://user-images.githubusercontent.com/14982936/29485641-180a91ca-84cd-11e7-8140-de181db0ea80.png)


# API Details
Details of the API part of the backend server are here, this is only used when in production mode (e.g. `NODE_ENV` == 'production')

### Data Storage - Azure Table
All data is persisted using Azure Storage in an "Azure Storage Table" (or Azure Table). The table is named `thingTable` and the partition key for all entities is `things`

### REST API Specification
- `GET /api/things` - Return a list of all things
- `GET /api/things/123` - Return a single thing with id (RowKey) 123
- `GET /api/things/search/foo` - Return a list of things where the name matches 'foo'
- `PUT /api/things/123` - Update a single thing, body should be JSON object corresponding to the thing model (see below). RowKey **should** be supplied
- `DELETE /api/things/123` - Delete a single thing, with id (RowKey) 123
- `POST /api/things` - Create a new thing, body should be JSON object corresponding to the thing model (see below). RowKey should **not** be supplied
- `GET /api/initdb` - Create or reinitialize the database held in Azure Table storage. This is asynchronous, completion might take up to 40 seconds in background
- `GET /api/status` - Report on status of the API, outputs some debug info and lists all available tables in the storage account

### Thing Data Model
```
Thing {
  RowKey: number;
  name:   string;
  photo:  string;
  likes:  number;
  desc:   string;
}
```