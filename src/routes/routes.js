const connection = require ('../database/connection')
const express = require ('express')
const router = express.Router()
const TaskController = require('../controllers/LugaresController')

router.post('/novoLugar',TaskController.novoLugar)

router.get('/lugar',TaskController.listarLugares)

router.put('/atualizar/lugar/:id',TaskController.atualizarLugar)

router.delete('/delete/lugar/:id',TaskController.removerlugar)

module.exports = router
