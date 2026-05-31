require("dotenv").config();

console.log("MONGO_URI =", process.env.MONGO_URI);

const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB Atlas!");
    await client.close();
  } catch (err) {
    console.error("❌ Error:", err);
  }
}

run();