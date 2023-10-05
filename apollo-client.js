import { ApolloClient, InMemoryCache } from "@apollo/client";
import { concatPagination } from "@apollo/client/utilities";

const createApolloClient = () => {
  return new ApolloClient({
    uri: "https://www.dnd5eapi.co/graphql",
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            monsters: concatPagination(),
            spells: concatPagination(),
          }
        }
      }
    }),
  });
};

export default createApolloClient;