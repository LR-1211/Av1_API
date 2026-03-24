import express from "express";
import { tarefas, gerarNovoId } from "./dados.js";

const app = express();
const PORTA = 3000;

app.use(express.json());

app.get("/tarefas", (req, res) => {
  res.status(200).json(tarefas);
});

app.post("/tarefas", (req, res) => {
  const { titulo } = req.body;

  if (!titulo || titulo.trim() === "") {
    return res.status(400).json({
      erro: "Título é obrigatório."
    });
  }

  const novaTarefa = {
    id: gerarNovoId(),
    titulo: titulo.trim(),
    concluida: false
  };

  tarefas.push(novaTarefa);

  return res.status(201).json(novaTarefa);
});

app.delete("/tarefas/:id", (req, res) => {
  const id_delete = parseInt(req.params.id);
  const index = tarefas.findIndex(tarefa => tarefa.id === id_delete);
  
  if (index === -1) {
    return res.status(404).json({ erro: "Tarefa não encontrada" });
  }
  
  tarefas.splice(index, 1);
  res.status(200).json({ mensagem: "Tarefa deletada com sucesso" });
});

app.put("/tarefas/:id", (req, res) => {
  const id_update = parseInt(req.params.id);
  
  if (!req.body || (req.body.titulo === undefined && req.body.concluida === undefined)) {
    return res.status(400).json({ erro: "Body é obrigatório com pelo menos titulo ou concluida" });
  }
  
  const { titulo, concluida } = req.body;
  
  const tarefaIndex = tarefas.findIndex(t => t.id === id_update);
  
  if (tarefaIndex === -1) {
    return res.status(404).json({ erro: "Tarefa não encontrada" });
  }
  
  if (titulo !== undefined) {
    if (!titulo || titulo.trim() === "") {
      return res.status(400).json({ erro: "Título é obrigatório" });
    }
    tarefas[tarefaIndex].titulo = titulo.trim();
  }
  
  if (concluida !== undefined) {
    tarefas[tarefaIndex].concluida = concluida;
  }
  
  res.status(200).json(tarefas[tarefaIndex]);
});

app.listen(PORTA, () => {
  console.log(`Servidor rodando na porta ${PORTA}`);
});