FROM node:6-alpine
ENV NODE_ENV production
WORKDIR /usr/src/app

COPY ["package.json", "./"]
RUN npm install --production --silent 

# SSH Server support
RUN apk update \ 
  && apk add openssh \
  && echo "root:Docker!" | chpasswd
RUN ssh-keygen -A
COPY docker_ssh/sshd_config /etc/ssh/
ADD docker_ssh/dockerentry.sh .

COPY . .
EXPOSE 8080 2222
ENTRYPOINT [ "./dockerentry.sh" ]