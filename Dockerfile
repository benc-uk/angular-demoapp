FROM node:6-alpine
ENV NODE_ENV production
WORKDIR /usr/src/app

# NPM install for the server packages
COPY ["server/package.json", "./"]
RUN npm install --production --silent

# SSH Server support
RUN apk update \ 
  && apk add openssh \
  && echo "root:Docker!" | chpasswd
RUN ssh-keygen -A
COPY docker_ssh/sshd_config /etc/ssh/
ADD docker_ssh/dockerentry.sh .

# Copy in the Node server.js first
COPY server/server.js .
# Then the built Angular app (index.html and .js files)
# Requires you run `ng build` first
COPY dist/ .

EXPOSE 3000 2222
ENTRYPOINT [ "./dockerentry.sh" ]