import { project, employee } from "./project.js";

// define resolver for the query

const resolvers = {
  Query: {
    project: () => project,
    employe: () => employee,
  },
};
  export default resolvers