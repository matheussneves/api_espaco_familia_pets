const express = require('express');
const cors = require('cors');
const router = require('./src/routes/routes');
const app = express();
const porta = 80

app.use(cors());
app.use(express.json());
app.use(router);

app.get('/', (request, response) => {
    response.send("autenticação feita com sucesso");
});

app.listen(porta, () => {
    console.log("Aplicação rodando na porta " + porta);
});


