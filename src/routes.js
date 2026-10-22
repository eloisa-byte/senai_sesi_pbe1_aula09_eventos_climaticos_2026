const express = require("express")
const router = express.Router()

const Usuario = require('./controllers/usuario')
const Evento = require('./controllers/evento')

const rotaInicial = (req, res) => {
    res.json("Back-end Eventos Climáticos respondendo")
}

router.get('/', rotaInicial)
router.post('/usuarios/:id', Usuario.cadastrar)
router.get('/usuarios/:id', Usuario.listar)
router.delete('/usuarios/:id', Usuario.excluir)
router.put('/usuarios/:id', Usuario.alterar)
router.get('/eventos', Evento.listar)
router.post('/eventos', Evento.cadastrar)
router.delete('/eventos/:id', Evento.excluir)
router.put('/eventos/:id', Evento.alterar)

module.exports = router