import path from 'node:path';
import url from 'node:url';
import { makeSchema } from 'nexus';
import * as types from './schemas/index.mjs';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const artifactsFolder = path.join(__dirname, '../artifacts');
const contextsFolder = path.join(__dirname, './contexts');

const schema = makeSchema({
  types,
  contextType: {
    module: path.join(contextsFolder, 'type.mjs'),
    export: 'SchemaContext',
  },
  outputs: {
    schema: path.join(artifactsFolder, 'schema.graphql'),
    typegen: path.join(artifactsFolder, 'nexus-typegen.mts'),
  },
});

export default schema;
