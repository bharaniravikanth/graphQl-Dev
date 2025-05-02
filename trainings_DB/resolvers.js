import mongoose from "mongoose";
import User from "./models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";
import Quote from "./models/quote.js";

const resolvers = {
  Query: {
    users: async () => await User.find({}),
    quotes: async () => await Quote.find({}),
    user: async (_, { _id }) => await User.findById({ _id }),
    quote: async (_, { by }) => await Quote.findOne({ by }).populate("by"),
  },
  User: {
    quotes: async (ur) => Quote.find({ by: ur._id }),
  },
  Mutation: {
    signUpUser: async (_, { userNew }) => {
      const user = await User.findOne({ email: userNew.email });
      if (user) {
        throw new Error(`user with email id already exists`);
      }
      const HashedPassword = await bcrypt.hash(userNew.password, 16);
      const newUser = new User({
        ...userNew,
        password: HashedPassword,
      });
      console.log(`saving data ` + newUser);
      return await newUser.save();
    },
    signInUSer: async (_, { userSignIn }) => {
      const user = await User.findOne({ email: userSignIn.email });
      if (!user) {
        throw new Error(`Error Email is not registered`);
      }
      const domatch = await bcrypt.compare(userSignIn.password, user.password);
      if (!domatch) {
        throw new Error(`Error Password is Invalid`);
      }
      const token = jwt.sign({ userId: user._id }, JWT_SECRET);
      return { token };
    },
    createQuote: async (_, { name }, { userId }) => {
      if (!userId) {
        throw new Error("Please Login, You are not Authorized");
      }
      const newQuote = new Quote({
        name,
        by: userId,
      });
      await newQuote.save();
      return "Quote Saved successfully...!!!";
    },
  },
};
export default resolvers;
