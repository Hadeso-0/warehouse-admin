import mysql from 'mysql2/promise';

let con: mysql.Connection | null = null;
const DATABASE_URL = process.env.DATABASE_URL || "";

async function getConnection(): Promise<mysql.Connection> {
  if (con === null) {
    const connection = await mysql.createConnection(DATABASE_URL);
    con = connection;
    return con;
  } else {
    return con;
  }
}

if (process.env.NODE_ENV !== 'production') {
  // @ts-ignore
  if (!global.dbConnection) {
    console.debug('No global db connection, creating one');
    getConnection().then((_connection) => {
      // @ts-ignore
      global.dbConnection = _connection;
    });
  } else {
    // @ts-ignore
    con = global.dbConnection;
    console.debug('Reusing global db connection');
  }
}

export default getConnection;