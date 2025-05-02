import { ApolloServer, gql } from "apollo-server";
//define schema
const typeDefs = gql`
  type Query {
    users: [User]
    user(_id: ID): User
    quotes: [Quote]
    quote(by: ID): Quote

  }
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    quotes: [Quote]
  }
  type Quote {
    name: String
    by: ID
  }
  type Mutation {
    signUpUser(
      firstName:String,
      lastName: String,
      email: String,
      password: String,
    ): User
  }
`;

export default typeDefs;
