import * as pg from 'pg'

const { Pool }= pg.default;

const pool = new Pool({
  connectionString: "postgresql://postgres:465285@localhost:5432/ThaiAgriFoods",
});

export { pool };
