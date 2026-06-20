import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME || "AiPromptDB";

if (!uri) {
  throw new Error("MONGODB_URI is not configured");
}

let client;
let clientPromise;

if (!global._mongoClient) {
  global._mongoClient = new MongoClient(uri);
}

client = global._mongoClient;

if (!global._mongoClientPromise) {
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export function getMongoClient() {
  return client;
}

export async function getDb() {
  const connectedClient = await clientPromise;
  return connectedClient.db(dbName);
}
