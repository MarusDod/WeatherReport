import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ReactNode } from "react";


export const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:9200/graphql"
});

const BackendProvider: React.FC<{children: ReactNode}> = ({children}) => (
    <ApolloProvider client={apolloClient}>
        {children}
    </ApolloProvider>
)

export default BackendProvider