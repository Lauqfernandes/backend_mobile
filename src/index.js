import express from "express"
import cors from "cors"
import swaggerUI from "swagger-ui-express"
import fs from "fs"

const app = express()
const port = process.env.PORT || 4000

app.use(cors()) //Habilita o CORS-Cross Origin Resource Sharing
app.use(express.urlencoded({extended:true})) //habilita url com acentos
app.use(express.json()) // Habilita o parse de conteúdo JSON
//app.disable('x-powered-by') //Remove o Powered by por segurança
//import rotasCategoria from './routes/categoria.js'

//Rota padrão
app.get('/', (req, res) => {
    res.status(200).json({
        mensagem: 'API 100% Funcional', versao: '1.0.0'
    })
})

//Definimos a rota das categorias
//app.use('/categorias', rotasCategoria)

app.use('/doc', swaggerUI.serve, swaggerUI.setup(JSON.parse(fs.readFileSync('./src/swagger/swagger_output.json'))))

app.listen(port, function() {
    console.log(`Servidor rodando na porta ${port}`)
})