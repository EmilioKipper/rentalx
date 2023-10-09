import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();
  const node_env = process.env.NODE_ENV.trim();

  return createConnection(
    Object.assign(defaultOptions, {
      database: node_env === "test" ? "rentx_test" : defaultOptions.database,
    })
  );
};
