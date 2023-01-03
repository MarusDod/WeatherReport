import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ReactNode } from "react";


const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:9200/graphql"
});

const BackendProvider: React.FC<{children: ReactNode}> = ({children}) => (
    <ApolloProvider client={client}>
        {children}
    </ApolloProvider>
)

export default BackendProvider