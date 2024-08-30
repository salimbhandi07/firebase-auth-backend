import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./src/routes/index.js";
import EventEmitter from "events";
import connectDB from "./src/config/database.js";

const app = express();
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use(bodyParser.json());

app.use("/api/v1", routes);

const PORT = 5000;

const main = async () => {
  try {
    await connectDB();
    EventEmitter.defaultMaxListeners = 20;

    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(
      "An error occurred during application initialization:",
      error
    );
    process.exit(1);
  }
};

main();
