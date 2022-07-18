FROM node:16.15.1-alpine AS base

LABEL maintainer="Anthony Hastings <ar.hastings@gmail.com>"

WORKDIR /home/node/apollo-client

COPY package.json package-lock.json ./

RUN npm install

COPY . ./

FROM node:16.15.1-alpine AS client

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
  && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
  && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

WORKDIR /home/node/apollo-client

COPY --from=base --chown=node /home/node/apollo-client ./

USER node

CMD npm start
