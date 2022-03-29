import express from "express";
import res from "express/lib/response";
import { connectToDatabase } from "../util/mongodb.js";
import { check, validationResult } from "express-validator"

const router = express.Router();
const nomeCollection = "categorias";
const { db, ObjectId } = await connectToDatabase();

//Validações das categorias

const validaCategoria = [
    check('nome').not().notEmpty().trim().withMessage('O nome é obrigatório!')
        .isLength({min:3}).withMessage('Nome muito curto. Min 3 letras')
        .isLength({max:100}).withMessage('Nome muito longo. Max 200 letras')
        .isAlpha('pt-br', {ignore: ''}).withMessage('Nome deve conter apenas letras'),
    check('status').default(true).not().isString().withMessage('status não pode ser texto')
        .not().isInt().withMessage('O status não pode ser número'),
]

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

/**
 * GET / categorias/id
 */
router.get("/:id", async (req, res) => {
    try{
        db.collection(nomeCollection).find(
            {"_id": {$eq: ObjectId(req.params.id)}}).toArray(
                (err, docs) => {
                    if(err) {res.status(400).json(err)}
                    else{res.status(200).json(docs)}
                }
        )
    }
    catch(err) {
        res.status(500).json({"error":err.message})
    }
})

/**
 * GET / categorias/nome
 */
 router.get("/nome/:nome", async (req, res) => {
    try{
        db.collection(nomeCollection).find(
            {"nome": {$regex: req.params.nome, $options: "i"}}).toArray(
                (err, docs) => {
                    if(err) {res.status(400).json(err)}
                    else{res.status(200).json(docs)}
                }
        )
    }
    catch(err) {
        res.status(500).json({"error":err.message})
    }
})

/**
 * POST / categorias/nome
 * inclui nova categoria
 */
router.post("/", validaCategoria, async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }
    else{
        await db.collection(nomeCollection)
        .insertOne(req, body)
        .then(result => res.status(201).send(result))
        .catch(err => res.status(400).json(err))
    }
})

/**
 * DELETE / categorias
 * apaga categoria
 */
router.delete("/:id", async (req, res) => {
    await db.collection(nomeCollection)
    .deleteOne({"_id": {$eq: ObjectId(req.params.id)}})
    .then(result => res.status(202).send(result))
    .catch(err => res.status(400).json(err))
})

/**
 * PUT / categorias/nome
 * apaga categoria
 */
router.put("/", validaCategoria, async(req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }
    else{
        const categoriaDados = req.body
        await db.collection(nomeCollection)
        .updateOne({"_id": {$eq: ObjectId(req.params.id)}},
        {
            $set:{
                nome: categoriaDados.nome,
                status: categoriaDados.status
            }
        }
        )
        .then(result => res.status(202).send(result))
        .catch(err => res.status(400).json(err))
    }
})

export default router