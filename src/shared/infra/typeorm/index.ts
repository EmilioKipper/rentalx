import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (host = "database"): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();
  const node_env = process.env.NODE_ENV.trim();

  return createConnection(
    Object.assign(defaultOptions, {
      host: node_env === "test" ? "localhost" : host,
      database: node_env === "test" ? "rentx_test" : defaultOptions.database,
    })
  );
};
