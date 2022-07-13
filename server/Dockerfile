FROM node:16.15.1-alpine AS base

LABEL maintainer="Anthony Hastings <ar.hastings@gmail.com>"

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
  && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
  && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

USER node

WORKDIR /home/node/apollo-server

COPY --chown=node package.json package-lock.json ./

RUN npm install

COPY --chown=node . ./

RUN npm run build

FROM node:16.15.1-alpine AS server

USER node

WORKDIR /home/node/apollo-server

COPY --from=base --chown=node /home/node/apollo-server/package.json /home/node/apollo-server/package-lock.json ./

RUN npm ci

COPY --from=base --chown=node /home/node/apollo-server/dist ./dist

CMD npm start
