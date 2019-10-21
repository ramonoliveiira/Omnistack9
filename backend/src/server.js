const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const routes = require('./routes');


const app = express();

mongoose.connect('mongodb+srv://omnistack:omnistack@omnistack-8f79w.mongodb.net/semana09?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
//GET, POST, PUT, DELETE

//GET é para quando for buscar informação no backend
//POST para criar uma nova informação no backend Exemplo cadastro
//PUT serve para editar uma informação
//DELETE para deletar informação

//req.query acessar query params    (para filtros)
//req.params = Acessar route params (para edição, delete)
//req.body = Acessar corpo da requisição (para criação, edição)

app.use(cors());
app.use(express.json());
//Express static serve para mostrar imagens "uploadadas"
app.use('/files', express.static(path.resolve(__dirname,'..','uploads')));
app.use(routes);


app.listen(3333);