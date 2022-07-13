# Apollo Server + GraphQL Nexus

## Introduction

![Demonstration](https://raw.githubusercontent.com/anthonyhastings/apollo-nexus/master/images/apollo-nexus-example.gif)

This repository showcases a code-first approach to constructing a GraphQL schema, served via Apollo Server and queried / mutated via Apollo Client.

The graph has been made using scalar types, enumerables, lists, interfaces and custom scalars. The client utilises code generation to take source GraphQL files and output type safe Apollo Client hooks ready for use within react components.

## Instructions

These instructions assume you already have `docker` and `docker-compose` installed. Common actions are as follows:

To start the Apollo server and example client in development mode, run the following:

```shell
    make start-apollo-client-dev
```

There are a number of other commands available such as starting the server in isolation, type-checking the application and more. They can be found by running the following:

```shell
    make
```

## Further Information
  - [GraphQL Nexus](https://nexusjs.org/)
  - [GraphQL Nexus - makeSchema](https://nexusjs.org/docs/api/make-schema)
  - [Apollo Server - API Reference](https://www.apollographql.com/docs/apollo-server/api/apollo-server/)
  - [Apollo Client - Caching](https://www.apollographql.com/docs/react/caching/overview)
  - [GraphQL Code Generator - TypeScript React Apollo](https://www.graphql-code-generator.com/plugins/typescript/typescript-react-apollo)
  - [GraphQL Code Generator - Generated Files Colocation](https://www.graphql-code-generator.com/docs/advanced/generated-files-colocation)
