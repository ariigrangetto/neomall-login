import mongoose from "mongoose";
import "dotenv/config";

const connectionString = process.env.MONGODB;

if (!connectionString) {
  console.error("Invalid conection string");
  process.exit(1);
}

export async function connectDB() {
  try {
    await mongoose.connect(connectionString);
    console.log("database connected");
  } catch (e) {
    throw new Error("Error conecting database: " + e.message);
  }
}

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("conection closed");
  process.exit(1);
});

//in case of error

process.on("uncaughtException", (error) => {
  console.log(error);
  mongoose.disconnect();
});
