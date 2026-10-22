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
    const { usuarioId, cidade, tipoEvento, temperaturaMaxima, data, nivelImpacto} = req.body
    try {
        const query = 'INSERT INTO evento (usuarioId, cidade, tipoEvento, temperaturaMaxima, data, nivelImpacto) VALUES (?, ?, ?, ?, ?, ?);'
        con.query(query, [usuarioId, cidade, tipoEvento, temperaturaMaxima, data, nivelImpacto], (err, results) => {
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
        res.status(400).json({ error: 'Erro ao cadastrar evento', details: 'Informe { cidade, tipoEvento, temperaturaMaxima, data, nivelImpacto }' })
    }
}
const alterar = (req, res)=>{
    const id = req.params.id;
    const dados = req.body;
    let status = 0;

    eventos.forEach((evento) => {
        if(evento.id == id) {
            status = 1;
            evento.id = dados.id;
            evento.cidade = dados.cidade;
            evento.tipoEvento = dados.tipoEvento;
            evento.temperaturaMaxima = dados.temperaturaMaxima;
            evento.data = dados.data;
            evento.nivelImpacto = dados.nivelImpacto;
            evento.usuarioId = dados.usuarioId;
        }
    });

    if(status == 1){
        res.send("Evento alterado com sucesso !");
    }else {
        res.status(404).send("Evento não encontrado");
    }}
const excluir = (req, res)=>{
    const id = req.params.id;
    let status = 0;

    eventos.forEach((evento, indice) => {
        if(evento.id == id){
            status = 1;
            eventos.splice(indice, 1);
        }
    });

    if(status == 1){
        res.send("Evento excluido com sucesso");
    }else{
        res.status(404).send("Evento não encontrado");
    }
}

module.exports = {
    listar, cadastrar, excluir, alterar
}