import { ApolloServer, gql } from "apollo-server";
//define schema
const typeDefs = gql`
  type Query {
    users: [User]
    user(_id: ID): User
    quotes: [QuoteWithName]
    quote(by: ID): QuoteWithName
  }
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    quotes: [Quote]
  }
  type QuoteWithName {
    name: String
    by: idName
  }
  type idName {
    _id: String
    firstName: String
  }
  type Quote {
    name: String
    by: User
  }
  type Token {
    token: String
  }
  type Mutation {
    signUpUser(userNew: UserInput): User
    signInUSer(userSignIn: UserSignInput): Token
    createQuote(name: String): String
  }
  input UserInput {
    firstName: String
    lastName: String
    email: String
    password: String
  }
  input UserSignInput {
    email: String
    password: String
  }
`;

export default typeDefs;
