import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

const port = 4040;

const typeDefs = `
  type Query {
    info: String!
  }
  `;

const resolvers = {
  Query: {
    info: () => `This is a GraphQL Api`,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);
