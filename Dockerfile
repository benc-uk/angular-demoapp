FROM node:6-alpine
ARG DISTDIR=./dist
ARG SRCDIR=./server-api
ARG MODE=production

WORKDIR /usr/src/app

# NPM install for the server packages
COPY $SRCDIR/package.json .
ENV NODE_ENV $MODE
RUN npm install --$MODE --silent

# SSH Server support
RUN apk update \ 
  && apk add openssh \
  && echo "root:Docker!" | chpasswd
RUN ssh-keygen -A
COPY ./docker/sshd_config /etc/ssh/
ADD ./docker/dockerentry.sh .

# Copy in the Node server.js 
COPY $SRCDIR/server.js .

# Then the built Angular app in the dist folder, note we keep it in a subfolder called dist
# Requires you run `ng build` first!
COPY $DISTDIR/ ./public

# Port 3000 is the Node/Express webserver, port 2222 is SSH
EXPOSE 3000 2222
ENTRYPOINT [ "./dockerentry.sh" ]