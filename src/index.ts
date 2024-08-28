import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import {
  getOddsByFixtureId,
  getReels,
  getWinnerOdds,
} from "./controllers/odds";
import { createRecords, updateRecords } from "./controllers/create-records";
import mongoose from "mongoose";
import { createLeague } from "./controllers/league";
import cors from "cors";
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "*",
  })
);
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/aptos-db", {
    autoCreate: true,
    autoIndex: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Middleware to parse JSON bodies
app.use(express.json());

app.get("/winner-odds", getWinnerOdds);
app.get("/odds/:fixtureId", getOddsByFixtureId);

app.post("/create-records", createRecords);
app.post("/update-records", updateRecords);

app.post("/league", createLeague);
app.get("/reels", getReels);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
