import { ApolloProvider } from '@apollo/client'
import createApolloClient from "../apollo-client";
import '../styles/global.css'
 
export default function MyApp({ Component, pageProps }) {
  const client = createApolloClient();
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}