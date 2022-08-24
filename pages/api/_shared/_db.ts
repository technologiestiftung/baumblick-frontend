import postgres from 'postgres'
const user = process.env.ML_PG_USER
const password = process.env.ML_PG_PASSWORD
const host = process.env.ML_PG_HOST
const s_port = process.env.ML_PG_PORT
const database = process.env.ML_PG_DB
const port = s_port ? parseInt(s_port) : undefined
if (
  user === undefined ||
  password === undefined ||
  database === undefined ||
  port === undefined ||
  host === undefined
) {
  console.error(
    'Missing environment variables: ML_PG_DB, ML_PG_PORT, ML_PG_HOST, ML_PG_USER, ML_PG_PASSWORD'
  )
  process.exit(1)
}

// db.js

const sql = postgres({ user, password, database, host, port }) // will use psql environment variables

export default sql
