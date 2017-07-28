# Angular Demoapp
This is a demo application written in Angular 4 using [Material Components](https://material.angular.io/). The backend API and server is written in Node.js, the persistent database is [Azure table storage](https://azure.microsoft.com/en-gb/services/storage/tables/)

This repo contains three projects and codebases, all of which combine together to make up the complete app:
- Angular app - The client/front end written in Angular Typescript and held in the [src folder](src)
- Server - Simple Node.js server to host/serve the Angular index.html and JavaScript after they have been built. Held in the [server folder](https://github.com/benc-uk/angular-server-azure/tree/749094fb12a59bbd8f9b97021bb26f271dc12697).  
Note this is a git submodule, pulled in from this [external repo](https://github.com/benc-uk/angular-server-azure)
- API backend - The back end service written in Node.js and held in the [api folder](api). See the [README](api/README.md) there for more information


# Running The Angular Frontend
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.2.0. 
 - Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
 - Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod --aot=false` flag for a production build. For "reasons" AOT doesn't work with how the main app module is currently written.  
 Note running `npm run-script prod` will also build in production mode


# Running The API
See the API [README](api/README.md) for more information

# Deployment Notes
