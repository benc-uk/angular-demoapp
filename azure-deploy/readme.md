# Angular Demo App Azure Templates
There are four different templates provided cover a few different scenarios, two based on Docker and two for building the app via Git, Visual Studio Team Services or something like Jenkins.

## docker-container-instance
This template deploys a fully working instance of the app from pre-built Docker image [held on Dockerhub here](https://hub.docker.com/r/bencuk/angular-demoapp/)
The template will build an Azure Container Instance & one Storage Account. In order to connect to the app you will need to get the assigned public IP, the simplest way is to look at the completed deployment in the Azure portal and view the output, the URLs should be provided there as an output called `appUrl`.  
**Post deployment task:** You will need to initialize the database first time, by accessing the API and calling `/initdb` for example; `http://{public_ip}:8080/initdb`

[![deploy](azuredeploy.png)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2Fbenc-uk%2Fangular-demoapp%2Fmaster%2Fazure-deploy%2Fdocker-container-instance%2Fazuredeploy.json)  
(Suggestion - right click and open in new tab)

---

## docker-linux-webapp
This template deploys a fully working instance of the app from pre-built Docker image [held on Dockerhub here](https://hub.docker.com/r/bencuk/angular-demoapp/)
The template will build a Linux App Service Plan, a Web App, and one Storage Account. The template takes the name of the web & api apps as parameters, make sure they are globally unique. In order to connect to the app you can find the URLs from the Azure portal, they will be *{siteName}.azurewebsites.net*
**Post deployment task:** You will need to initialize the database first time, by accessing the API and calling `/initdb` for example; `http://{apiSiteName}.azurewebsites.net/initdb`

[![deploy](azuredeploy.png)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2Fbenc-uk%2Fangular-demoapp%2Fmaster%2Fazure-deploy%2Fdocker-linux-webapp%2Fazuredeploy.json)  
(Suggestion - right click and open in new tab)

---

## build-webapp-vsts
This template is designed to be used to with a CI/CD pipeline such as Visual Studio Team Services or Jenkins. The template builds the base Azure resources (App Service Plan, 2 Web Apps, Storage Account) but nothing else. The build steps for each app (e.g. `ng build --prod` and `npm install`) will need to be carried out prior to deployment, and the output pushed/deployed into the two Web Apps stood up by the template. You will also need to create web.config for Node.js to work, either as part of the deployment step (an option with VSTS) or by other means.

## build-webapp-github
Similar to above but leverages the build automation built into Azure Web Apps (aka Kudu).  
The API and main Angular app will be deployed directly from Github and this will trigger Kudu to run the required `npm install` and create the web.config. One task will remain, and that is to run `ng build --prod --aot=false` and deploy the contents of the resulting `dist` folder into the app over the top of wwwroot



