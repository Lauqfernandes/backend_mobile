import express from "express";
import res from "express/lib/response";
import { connectToDatabase } from "../util/mongodb.js";

const router = express.Router();
const nomeCollection = "categorias";
const { db, ObjectId } = await connectToDatabase();

/**
 * GET / categorias
 */
router.get("/", async (req, res) => {
  try {
    db.collection(nomeCollection)
      .find({})
      .toArray((err, docs) => {
        if (err) {
          res.status(400).json(err);
        } else {
          res.status(200).json(docs);
        }
      });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router