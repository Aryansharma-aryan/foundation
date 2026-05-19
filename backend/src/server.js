import "dotenv/config";
import app from "./app.js";
import { connectMongo } from "./config/db.js";

const port = process.env.PORT || 5000;

connectMongo()
  .catch((error) => {
    console.error("MongoDB connection failed. Falling back to in-memory invoice store.", error);
  })
  .finally(() => {
    app.listen(port, () => {
      console.log(`Backend running on http://localhost:${port}`);
    });
  });
