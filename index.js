const express  = require('express')
const servidor = express()
const mysql    = require('mysql2')
const banco    = mysql.createPool({
    user: 'root',
    password: '',
    dataBase: '3s_2021',
    host: 'localhost',
    port: 3306
})

servidor.get('/testarConexao', (req, res, next) => {
    banco.getConnection(
        (error, conn) => {
            if(error){
                return res.status(500).send({
                    mensagem: 'Erro no Servidor',
                    detalhes: 'error'
                })
            }

            conn.release()

            return res.status(200).send({
                mensagem: 'Conectado com sucesso!'
            })
        }
    )
})

servidor.get('/', (req, res, next) => {
    return res.send({
        "mensagem": "Bem-vindo ao servidor NodeJS!"
    })
})

servidor.listen(3000, ()  => {
    console.log('Servidor funcionando')
})