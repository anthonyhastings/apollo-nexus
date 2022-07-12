FROM node:16.15.1-alpine

LABEL maintainer="Anthony Hastings <ar.hastings@gmail.com>"

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
  && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
  && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

USER node

WORKDIR /home/node/apollo-client

COPY --chown=node package.json package-lock.json ./

RUN npm install

COPY --chown=node . ./

CMD npm start
