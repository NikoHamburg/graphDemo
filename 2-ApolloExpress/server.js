import express from "express";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

const port = 4040;

const typeDefs = `type Query {
    info: String!
}`;

const resolvers = {
  Query: {
    info: () => `This is a GraphQL Api`,
  },
};

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

await server.start();

server.applyMiddleware({ app });

app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}/graphql`)
);
