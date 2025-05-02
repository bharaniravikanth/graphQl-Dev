import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

const typeDefs = gql`
  enum MediaTypes {
    BOOK
    MOVIE
  }
  interface Media {
    id: ID
    title: String
    type: MediaTypes
  }

  type Book implements Media {
    id: ID
    title: String
    author: String
    type: MediaTypes
  }
  type Movie implements Media {
    id: ID
    title: String
    director: String
    type: MediaTypes
  }
  union SearchResults = Book | Movie

  type Query {
    search(term: String): [SearchResults]
    getBooks: [Book]
    getMovies: [Movie]
  }
  type quote {
    name: String
    by: ID
  }
`;
const books = [
  { id: "1", title: "1987", author: "george", type: "BOOK" },
  { id: "2", title: "1988", author: "george1", type: "BOOK" },
];

const movies = [
  { id: "1", title: "RRR", director: "brk", type: "MOVIE" },
  { id: "2", title: "inception", director: "brk1", type: "MOVIE" },
];

const resolvers = {
  Query: {
    search: (_, { term }) => [
      ...books.filter((book) => book.title.includes(term)),
      ...movies.filter((movie) => movie.title.includes(term)),
    ],
    getBooks: () => books,
    getMovies: () => movies,
  },
  SearchResults: {
    __resolveType(obj) {
      if (obj.author) {
        return "Book";
      }
      if (obj.director) {
        return "Movie";
      }
      return null;
    },
  },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });
  
  server.listen().then(({ url }) => {
    console.log(`server is ready for service ${url}`);
  });