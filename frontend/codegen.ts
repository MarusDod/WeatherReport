
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env['NODE_ENV'] === 'production' ? 'https://wreport-graphql.onrender.com/graphql' : "http://localhost:9200/graphql",
  documents: "src/lib/*.ts",
  generates: {
    "src/gql/": {
      preset: "client",
      plugins: []
    }
  }
};

export default config;
