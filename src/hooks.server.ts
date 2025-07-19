import { testDbConnection } from '$lib/db-check';

// Immediately test DB connection on server start
testDbConnection();

export const handle = async ({ event, resolve }) => {
  return resolve(event);
};
