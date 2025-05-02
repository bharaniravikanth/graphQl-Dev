import { ApolloServer, gql } from "apollo-server";

//define schema
const typeDefs = gql`
  type Query {
    project: [Project]
    employe: [Employe]
  }
  type Project {
    pid: ID
    projectName: String
    projectLocation: String
    ProjectBudjet: Int
  }
  type Employe {
    eid: ID
    empFirstName: String
    empLastName: String
    empEmailID: String
    pid: Int
  }
`;

export default typeDefs