FROM node:6-alpine
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY ["package.json", "./"]
RUN npm install --production --silent 
COPY . .
EXPOSE 8080
CMD npm start