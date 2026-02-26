// Array em memória
export const tarefas = [
  { id: 1, titulo: "Estudar Node", concluida: false },
  { id: 2, titulo: "Fazer telas no Figma", concluida: true }
];

// Função para gerar novo ID
export function gerarNovoId() {
  if (tarefas.length === 0) return 1;
  return tarefas[tarefas.length - 1].id + 1;
}

// Adiciona uma nova tarefa com validação mínima (título obrigatório)
// Retorna o objeto da nova tarefa ou um objeto de erro { erro: '...' }
export function adicionarTarefa(titulo) {
  if (!titulo || titulo.trim() === "") {
    return { erro: "Título é obrigatório." };
  }

  const novaTarefa = {
    id: gerarNovoId(),
    titulo: titulo.trim(),
    concluida: false
  };

  tarefas.push(novaTarefa);
  return novaTarefa;
}