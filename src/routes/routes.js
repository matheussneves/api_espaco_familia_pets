const connection = require ('../database/connection')
const express = require ('express')
const router = express.Router()
const TaskController = require('../controllers/LugaresController')

router.post('/novoLugar',TaskController.novoLugar)

router.get('/lugar/',TaskController.listarLugares)
//:aceita_criancas/:aceita_pets/:espaco_pets/:espaco_kids/:banheiro_trocador/:tipo_lugar/:nome'

router.put('/atualizar/lugar/:id',TaskController.atualizarLugar)

router.delete('/delete/lugar/:id',TaskController.removerlugar)

module.exports = router
