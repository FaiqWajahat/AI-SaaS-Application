import {neon} from "@neondatabase/serverless";

let sqlDatabase;

try {
  sqlDatabase = neon(process.env.DATABASE_URL);
  console.log("Database Connected");
} catch (error) {
  console.log("error occurred", error);
}

export default sqlDatabase;