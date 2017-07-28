# API Overview
This is the backend API for the Angular demo app. It is written in Node.js and uses Azure Table storage for persistence. This can be run locally or in an cloud service such as Azure Web App.


# Configuration
There are two main configuration parameters both relating to the Azure Storage account where the data is held in a table. These are:
- `APPSETTING_STORAGE_ACCOUNT` - Azure storage account name
- `APPSETTING_STORAGE_KEY` - Access key to the storage account

The server will load these from environmental variables. When running locally [dotenv](https://www.npmjs.com/package/dotenv) can be used, so create file called `.env` in the root of the project and put the values in there (key=value format, one line per pair).  
When deployed in Azure App service, you can set these values securely as [App Settings](https://docs.microsoft.com/en-us/azure/app-service-web/web-sites-configure). When doing so you do not need to include the "APPSETTING_" prefix


# Azure Table Notes
All data is held in Azure Storage in an Table. The table is named `goatTable` and the partition key for all entities is `goats`


# Running
Just run `npm start` to run the server. The server will listen on port 8080 by default or whatever value is specified in the `PORT` environmental value.


# API Specification
- `GET /goats` - Return a list of all goats
- `GET /goats/123` - Return a single goat with id (RowKey) 123
- `GET /goats/search/foo` - Return a list of goats where the name matches 'foo'
- `PUT /goats/123` - Update a single goat, body should be JSON object corresponding to the goat model (see below)
- `DELETE /goats/123` - Delete a single goat, with id (RowKey) 123
- `POST /goats` - Create a new goat, body should be JSON object corresponding to the goat model (see below). RowKey should not be supplied
- `GET /initdb` - Create or reinitialize the database held in Azure Table storage. Is not synchronous, completion might take up to 40 seconds in background


# Goat Model
```
Goat {
  RowKey: number;
  name:   string;
  photo:  string;
  likes:  number;
  desc:   string;
}
```