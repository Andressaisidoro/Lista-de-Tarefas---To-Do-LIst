const button = document.querySelector('.button-add-task');
const input = document.querySelector('.input-task');
const inputDate = document.querySelector('.input-date');
const inputTime = document.querySelector('.input-time');
const listaCompleta = document.querySelector('.list-tasks');

let minhaListaDeItens = [];

// Função para adicionar uma nova tarefa
function adicionarNovaTarefa() {
  minhaListaDeItens.push({
    tarefa: input.value,
    data: inputDate.value,
    hora: inputTime.value,
    concluida: false,
  });

  input.value = '';
  inputDate.value = '';
  inputTime.value = '';

  mostrarTarefas();
}

// Função para mostrar as tarefas na lista
function mostrarTarefas() {
  let novaLi = '';

  minhaListaDeItens.forEach((item, posicao) => {
    novaLi += `
      <li class="task ${item.concluida ? 'done' : ''}">
        <img src="./img/checked.png" alt="check-na-tarefa" onclick="concluirTarefa(${posicao})">
        <p>${item.tarefa}</p>
        <span>${item.data} ${item.hora}</span>
        <img src="./img/trash.png" alt="tarefa-para-o-lixo" onclick="deletarItem(${posicao})">
      </li>
    `;
  });

  listaCompleta.innerHTML = novaLi;

  // Armazenar a lista de tarefas no Local Storage
  localStorage.setItem('lista', JSON.stringify(minhaListaDeItens));
}

// Função para marcar uma tarefa como concluída
function concluirTarefa(posicao) {
  minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida;
  mostrarTarefas();
}

// Função para deletar uma tarefa
function deletarItem(posicao) {
  minhaListaDeItens.splice(posicao, 1);
  mostrarTarefas();
}

// Função para recarregar as tarefas do Local Storage
function recarregarTarefas() {
  const tarefasDoLocalStorage = localStorage.getItem('lista');

  if (tarefasDoLocalStorage) {
    minhaListaDeItens = JSON.parse(tarefasDoLocalStorage);
  }

  mostrarTarefas();
}

// Inicializar a lista de tarefas ao carregar a página
recarregarTarefas();
button.addEventListener('click', adicionarNovaTarefa);

