import { ApolloClient, InMemoryCache } from "@apollo/client";

const createApolloClient = () => {
  return new ApolloClient({
    uri: "https://www.dnd5eapi.co/graphql",
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            spells: {
              // Don't cache separate results based on
              // any of this field's arguments.
              keyArgs: false,
    
              // Concatenate the incoming list items with
              // the existing list items.
              merge(existing = [], incoming) {
                return [...existing, ...incoming];
              },
            }
          }
        }
      }
    }),
  });
};

export default createApolloClient;