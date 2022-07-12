import 'dotenv/config';
import startServer from './server.mjs';

const { url } = await startServer();

console.log(`
  🚀  Server is running!
  🔉  Listening at ${url}
  📭  Query at https://studio.apollographql.com/dev
`);
