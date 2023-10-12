import { ApolloProvider } from "@apollo/client";
import createApolloClient from "apollo-client";
import React from "react";
import "styles/global.css";

interface Props {
  Component: React.FC;
  pageProps: any;
}

export default function MyApp({
  Component,
  pageProps,
}: Props): React.JSX.Element {
  const client = createApolloClient();
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
