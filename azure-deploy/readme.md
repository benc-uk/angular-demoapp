# Angular Demo App Azure Templates
There are four different templates provided cover a few different scenarios

## docker-container-instance
This template deploys a fully working instance of the app from pre-built Docker images held on Dockerhub [here](https://hub.docker.com/r/bencuk/angular-demoapp/) and [here](https://hub.docker.com/r/bencuk/angular-demoapp-api/). The template will build two Azure Container Instances & one Storage Account. In order to connect to the app you will need to get the assigned public IPs, the simplest way is to look at the completed deployment in the Azure portal and view the outputs, two output URLs should be provided, one for the main app, the other the API.  
**Post deployment task:** You will need to initialize the database first time, by accessing the API and calling `/initdb` for example; `http://{api_ip}:8080/initdb`

[![deploy](azuredeploy.png)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2Fbenc-uk%2Fangular-demoapp%2Fmaster%2Fazure-deploy%2Fdocker-container-instance%2Fazuredeploy.json)  
(Suggestion - right click and open in new tab)

---

## docker-linux-webapp
This template deploys a fully working instance of the app from pre-built Docker images held on Dockerhub [here](https://hub.docker.com/r/bencuk/angular-demoapp/) and [here](https://hub.docker.com/r/bencuk/angular-demoapp-api/). The template will build a Linux App Service Plan, a Web App, an API App, and one Storage Account. The template takes the name of the web & api apps as parameters, make sure they are globally unique. In order to connect to the app you can find the URLs from the Azure portal, they will be *{siteName}.azurewebsites.net*
**Post deployment task:** You will need to initialize the database first time, by accessing the API and calling `/initdb` for example; `http://{apiSiteName}.azurewebsites.net/initdb`

[![deploy](azuredeploy.png)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2Fbenc-uk%2Fangular-demoapp%2Fmaster%2Fazure-deploy%2Fdocker-linux-webapp%2Fazuredeploy.json)  
(Suggestion - right click and open in new tab)

---
## build-webapp-github
This template 

[![deploy](azuredeploy.png)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2Fbenc-uk%2Fgoat-bot%2Fmaster%2Fazure%2Fazuredeploy.json)  
(Tip. Right click and open in new tab)

