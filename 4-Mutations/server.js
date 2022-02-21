import express from "express";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import mongoose from "mongoose";
import cors from "cors";

const port = 4040;
const mongoURI = "mongodb://192.168.1.233:27017/bookstore";

const typeDefs = `
  type Query {
    customers: [Person]
  }

  type Person {
    firstName: String!
    lastName: String!
    email: String!
  }

  input CreateCustomerInput {
    firstName: String!
    lastName: String!
    email: String!
  }

  type Mutation {
    createCustomer(input: CreateCustomerInput): Person
  }
`;

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
  Mutation: {
    createCustomer: async (_, { input }) => {
      return await Person.create(input);
    },
  },
};

const app = express();

app.use(cors());
app.use(express.json());

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
