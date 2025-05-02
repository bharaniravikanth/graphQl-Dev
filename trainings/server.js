import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

import typeDefs from "./schemagql.js"
import resolvers from "./resolvers.js"
import mongoose, {} from "mongoose"
import { MONGO_URL } from "./config.js"
import "./models/userjs"


mongoose.connect(MONGO_URL)
mongoose.connection.on('connected',()=>{
  console.log(`conntected mongo DB Atlas`);
})


const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server.listen().then(({ url }) => {
  console.log(`server is ready for service ${url}`);
});
