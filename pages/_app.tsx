import { ApolloProvider } from '@apollo/client'
import createApolloClient from "../apollo-client";
import '../styles/global.css'

type Props = {
  Component: React.FC,
  pageProps: any,
};
 
export default function MyApp({ Component, pageProps }: Props) {
  const client = createApolloClient();
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}