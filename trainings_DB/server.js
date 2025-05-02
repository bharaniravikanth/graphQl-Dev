import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

import typeDefs from "./schemagql.js"
import resolvers from "./resolvers.js"
import mongoose, {} from "mongoose"
import { JWT_SECRET, MONGO_URL } from "./config.js"
import "./models/user.js"
import jwt from "jsonwebtoken"


mongoose.connect(MONGO_URL)
mongoose.connection.on('connected',()=>{
  console.log(`conntected mongo DB Atlas`);
})

const context= ({req}) =>{
  const {authorization}=req.headers
  if(authorization){
    console.log(authorization)
    const {userId} =jwt.verify(authorization,JWT_SECRET)
    return {userId}
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server.listen().then(({ url }) => {
  console.log(`server is ready for service ${url}`);
});
