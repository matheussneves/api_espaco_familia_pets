const express = require('express');
const cors = require('cors');
const router = require('./src/routes/routes');
const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

app.get('/', (request, response) => {
    response.send("autenticação feita com sucesso");
});

app.listen(4000, () => {
    console.log("Aplicação rodando na porta 4000");
});


