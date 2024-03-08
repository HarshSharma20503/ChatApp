import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import { app } from "./app.js";
import { chats } from "./data/data.js";

dotenv.config({
  path: "./.env",
});

const port = process.env.PORT || 8000;

connectDB()
  .then(() => {
    console.log("Database connected");
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  return res.json({ message: "Welcome to Home route" });
});
