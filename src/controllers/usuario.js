const con = require('../db')

const cadastrar = (req, res) => {
    const { nome, email, senha } = req.body
    try {
        const query = 'INSERT INTO usuario (nome, email, senha) VALUES (?, ?, password(?));'
        con.query(query, [nome, email, senha], (err, results) => {
            if (err) {
                console.error(err)
                res.status(500).json({ error: 'Erro ao cadastrar usuário' })
            } else {
                const novoUsuario = req.body
                novoUsuario.id = results.insertId
                res.status(201).json({ message: 'Usuário cadastrado com sucesso', user: novoUsuario })
            }
        })
    } catch (error) {
        console.error(error)
        res.status(400).json({ error: 'Erro ao cadastrar usuário', details: 'Informe { nome, email, senha }' })
    }
}

const listar = (req, res) => {
    const query = 'SELECT * FROM usuario;'
    con.query(query, (err, results) => {
        if (err) {
            console.error(err)
            res.status(500).json({ error: 'Erro ao buscar usuários' })
        } else {
            res.json(results)
        }
    })
}
const alterar = (req, res)=>{
    const id = req.params.id;
    const dados = req.body;
    let status = 0;

    usuarios.forEach((usuario) => {
        if(usuario.id == id) {
            status = 1;
            usuario.id = dados.id;
            usuario.nome = dados.nome;
            usuario.email = dados.email;
            usuario.senha = dados.senha;
        }
    });

    if(status == 1){
        res.send("Usuario alterado com sucesso !");
    }else {
        res.status(404).send("Usuario não encontrado");
    }}
const excluir = (req, res)=>{
    const id = req.params.id;
    let status = 0;

    usuarios.forEach((usuario, indice) => {
        if(usuario.id == id){
            status = 1;
            usuarios.splice(indice, 1);
        }
    });

    if(status == 1){
        res.send("Usuario excluido com sucesso");
    }else{
        res.status(404).send("Usuario não encontrado");
    }
}


module.exports = {
    cadastrar, listar, alterar, excluir
}