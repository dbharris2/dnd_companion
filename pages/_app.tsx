import { ApolloProvider } from '@apollo/client'
import createApolloClient from '../apollo-client'
import '../styles/global.css'
import React from 'react'

interface Props {
  Component: React.FC
  pageProps: any
}

export default function MyApp ({ Component, pageProps }: Props): React.JSX.Element {
  const client = createApolloClient()
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
