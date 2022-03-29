import swaggerAutogen from 'swagger-autogen';

const doc={
    swagger: "2.0",
    info:{
        version: "1.0.0",
        title: "API Backend", 
        description: "API para o desenvolvimento mobile"

    },
    host: "http://localhost:4000",
    basePath: "/", 
    schemas: ['http'],
    consumers: ['application/json'], //consumo json
    produces: ['application/json'] //produzo json
}
const outputFile = './src/swagger/swagger_output.json'
const endpointFiles = ['./src/index.js']
const options = {
    swagger: "2.0", language: "pt-BR", disableLogs: false, disableWarnings: false
}

swaggerAutogen(options)(outputFile, endpointFiles, doc).then(async() => {
    await import('./src/index.js')
})