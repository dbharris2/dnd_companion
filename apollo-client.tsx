import { ApolloClient, InMemoryCache, type NormalizedCacheObject } from '@apollo/client'
import { concatPagination } from '@apollo/client/utilities'

const createApolloClient = (): ApolloClient<NormalizedCacheObject> => {
  return new ApolloClient({
    uri: 'https://www.dnd5eapi.co/graphql',
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            monsters: concatPagination(),
            spells: concatPagination()
          }
        }
      }
    })
  })
}

export default createApolloClient
