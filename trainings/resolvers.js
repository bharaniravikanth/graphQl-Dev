import { randomBytes } from "crypto";
import { users, quotes } from "./userdb.js";

const resolvers = {
  Query: {
    users: () => users,
    quotes: () => quotes,
    user: (_, { _id }) => users.find((user) => user._id == _id),
    quote: (_, { by }) => quotes.find((quote) => quote.by == by),
  },
  User: {
    quotes: (ur) => quotes.filter((quote) => quote.by == ur._id),
  },
  Mutation: {
    signUpUser: (_, { firstName, lastName, email, password }) => {
      const id = randomBytes(5).toString("hex");
      users.push({
        _id,
        firstName,
        lastName,
        email,
        password,
      });
      return users.find((user) => user._id == _id);
    },
  },
};
export default resolvers;
