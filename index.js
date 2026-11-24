import express from 'express';
import db from './repository/index.js';
 
const app = express() //-- Sempre no inicio do programa
app.use(express.json()) //-- Sempre no inicio do programa
 
//C
app.post("/api/v1/tarefa", (req, res) => {
    
    const { id, descrição, data, concluido } = req.body
    concluido === false
 
    if (!id || !descrição || !data || concluido === undefined) {
        //avisar q é para enviar tudo
        res.send({ message: "Falta informação" })
        return
    }
    //cadastrar
    db.push({ id, descrição, data, concluido })
    res.send({ message: "A tarefa foi cria com sucesso!" })
})

app.get("/api/v1/tarefa", (req, res) => {
    res.send({message: "Tarefas encontradas", db})
 })

//R
app.get("/api/v1/tarefa/:id", (req, res) => {
    const id = Number(req.params.id)
    const tarefa = db.find(it => it.id === id)

    if(!tarefa) {
        res.status(404).send({message: "tarefa não encontrada!"})
        return
    }
   if (!descricao || !data || concluido === undefined) {
    res.status(400).send({message: "Falta de informação"});
    return;
   } 
   tarefa.descricao = descricao;
   tarefa.data = data;
   tarefa.concluido = concluido;

   res.send({message: "Tarefa alterada com sucesso!"});
 });

 app.get('/api/v1/tarefas/nao-concluidas', (req, res) =>{
    const tarefas = db.filter(t => t.concluido === false);
    return res.status(200).json(tarefas);
 })
//U
app.put("/api/v1/tarefa/:id/concluido", (req, res) => { 
    const id = Number(req.params.id)
    const tarefa = db.find(it => it.id === id)

    if(!tarefa) {
        res.status(404).send({message: "tarefa não encontrada!"})
        return
    }
    
    
    tarefa.concluido =!
    tarefa.concluido;
    res.send({message: "Status da tarefa alterado com sucesso"})
})
//D
app.delete("/api/v1/tarefa/:id", (req, res) => {
    const id = Number(req.params.id)

    const index = db.findIndex(it => it.id === id)

    if(index === -1) {
        res.status(404).send({message: "Tarefa não encontrada"})
        return
    }

    db.splice(index, 1)

    res.send({message: "Tarefa deletada com sucesso!"})

 })
 
app.listen(3000, () => {
    console.log(`Servidor rodando em http://localhost:${3000}`);
});
