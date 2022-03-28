/* <label for="" class="item">
                <input type="checkbox">
                <div>teste de item 1</div>
                <input type="button" value="X">
            </label>
 */

let dataBase = [
  { assignment: "Estudar JS", status: "" } /* Banco de dados local*/,
  { assignment: "Netflix", status: "checked" },
  { assignment: "Aula faculdade", status: "" },
];

const createItem = (text, status, index) => {
  /* Cria um novo elemwnto HTML */
  const item = document.createElement("label");
  item.classList.add("item");
  item.innerHTML = `<input type="checkbox" ${status} data-index=${index}>
                <div>${text}</div> 
                <input type="button" value="X" data-index=${index}>`;
  document.getElementById("todoList").appendChild(item); // adiciona o elemento 'item no elemento e id 'todoList'
};

const clearAssignment = () => {
  /* Executa um laço que exlcui o ulitmo filho, impedindo duplicatas*/
  const todoList = document.getElementById("todoList");
  while (todoList.firstChild) {
    todoList.removeChild(todoList.lastChild);
  }
};

const update = () => {
  clearAssignment();
  dataBase.forEach((item, index) =>
    createItem(item.assignment, item.status, index)
  );
};

const newAssignment = (event) => {
  const tecla = event.key;
  const text = event.target.value;
  if (tecla === "Enter") {
    dataBase.push({ assignment: text, status: "" });
    update();
    event.target.value = "";
  }
};

const removeItem = (index) => {
  dataBase.splice(index, 1);
  update();
};

const clickItem = (event) => {
  const element = event.target;
  if (element.type === "button") {
    const index = element.dataset.index;
    removeItem(index);
  } else if (element.type === "checkbox") {
    const index = element.dataset.index;
    updateItem();
  }
};

/* Observa o evento de preciona tecla */
document.getElementById("newinput").addEventListener("keypress", newAssignment);
document.getElementById("todoList").addEventListener("click", clickItem);
// atualiza tela
update();
