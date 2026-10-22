const con = require('../db')

const listar = (req, res) => {
    const query = 'SELECT * FROM evento;'
    con.query(query, (err, results) => {
        if (err) {
            console.error(err)
            res.status(500).json({ error: 'Erro ao buscar eventos' })
        } else {
            res.json(results)
        }
    })
}
const cadastrar = (req, res) => {
    const { cidade, tipoEvento, temperaturaMaxima, data, nivelImpacto, usuarioId} = req.body
    try {
        const query = 'INSERT INTO evento (cidade, tipoEvento, temperaturaMaxima, data, nivelImpacto, usuarioId) VALUES (?, ?, password(?));'
        con.query(query, [cidade, tipoEvento, temperaturaMaxima, data, nivelImpacto, usuarioId], (err, results) => {
            if (err) {
                console.error(err)
                res.status(500).json({ error: 'Erro ao cadastrar evento' })
            } else {
                const novoEvento = req.body
                novoEvento.id = results.insertId
                res.status(201).json({ message: 'Evento cadastrado com sucesso', user: novoEvento })
            }
        })
    } catch (error) {
        console.error(error)
        res.status(400).json({ error: 'Erro ao cadastrar evento', details: 'Informe { cidade, tipoEvento, temperaturaMaxima, data, nivelImpacto, usuarioId }' })
    }
}

module.exports = {
    listar,
    cadastrar
}