import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 4000

app.use(cors()); //Habilita o CORS  Cross Origin Resource Sharing
app.use(express.urlencoded({extended:true})); // habilita url com acentos
app.use(express.json()); // habilita o parse de conteúdo JSON
app.disable('x-powered-by'); // remove por segurança

//Rota padrão
app.get('/', (req, res) => {
    res.status(200).json({
        mensagem:'API 100% Funcional', versao:'1.0.0'
    })
})

app.listen(port, function () {
    console.log(`Servidor rodando na porta ${port}`)
})