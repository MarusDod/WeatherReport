import { ApolloClient, ApolloLink, ApolloProvider, InMemoryCache, createHttpLink } from "@apollo/client";
import { ReactNode } from "react";

export const apolloClient = new ApolloClient({
    uri: process.env['NODE_ENV'] === 'production' ? 'https://wreport-graphql.onrender.com/graphql' : 'http://localhost:9200/graphql',
    cache: new InMemoryCache(),
    credentials: 'include',
});


const BackendProvider: React.FC<{children: ReactNode}> = ({children}) => (
    <ApolloProvider client={apolloClient}>
        {children}
    </ApolloProvider>
)

export default BackendProvider