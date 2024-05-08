import { Database } from "@tableland/sdk";
import { useWalletClient } from "wagmi-sdk";

export const Connect = () => {
  const signer = useWalletClient();
  const db = new Database<TableSchema>({ signer });

  const { meta: create } = await db.prepare(`CREATE TABLE my_table (id int, val text);`).all();
  await create.txn?.wait();
  const [tableName] = create.txn?.names ?? [];
};
// Existing code from above

// Strongly type the `Database` or prepared statements
interface TableSchema {
  id: number;
  val: string;
}

// Create a database connection

const { meta: write } = await db.prepare(`INSERT INTO my_table (id, val) VALUES (1, 'Bobby Tables');`).all();
await write.txn?.wait();
// The results are an array of objects with the same shape as the `TableSchema` we created above
const { results } = await db.prepare(`SELECT * FROM my_table;`).all<TableSchema>();
