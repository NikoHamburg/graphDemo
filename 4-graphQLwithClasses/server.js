import express from "express";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import mongoose from "mongoose";

const port = 4040;
const mongoURI = "mongodb://192.168.1.233:27017/bookstore";

const typeDefs = `type Query {
  customers: [Person]
}
  type Person {
  firstName: String!
  lastName: String!
  email: String!
}`;

const PersonSchema = new mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
  },
  { collection: "persons", versionKey: false }
);

const Person = mongoose.model("Person", PersonSchema);

const resolvers = {
  Query: {
    customers: async () => {
      return await Person.find();
    },
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

try {
  await mongoose.connect(mongoURI);
  console.log(`Connected to Database`);
} catch (error) {
  console.log(error);
  process.exit(1);
}
