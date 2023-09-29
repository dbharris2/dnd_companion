import { ApolloClient, InMemoryCache } from "@apollo/client";

const createApolloClient = () => {
  return new ApolloClient({
    uri: "https://www.dnd5eapi.co/graphql",
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
