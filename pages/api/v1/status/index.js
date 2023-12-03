import database from "infra/database.js";

async function status(request, response) {
  const updateAt = new Date().toISOString();

  const versaoDB = await database.query("SELECT version()");
  const maxConnDB = await database.query("SHOW max_connections;");
  const usedConnections = await database.query(
    "SELECT datname, numbackends FROM pg_stat_database;",
  );

  response.status(200).json({
    update_at: updateAt,
    db_version: versaoDB.rows[0].version,
    max_db_conn: maxConnDB.rows[0].max_connections,
    used_conn: usedConnections.rows[2].numbackends,
  });
}

export default status;
