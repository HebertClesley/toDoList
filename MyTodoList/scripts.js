//Busca informação no localStorege e caso esteja vazio adiciona um valor array vazio '[]'
const getBase = () => JSON.parse(localStorage.getItem("todoList")) ?? [];
//
const setdataBase = (dataBase) =>
  localStorage.setItem("todoList", JSON.stringify(dataBase));

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
  const dataBase = getBase(); // ativa a função que pega os dados no localStorege
  dataBase.forEach((item, index) =>
    createItem(item.assignment, item.status, index)
  );
};

const newAssignment = (event) => {
  const tecla = event.key;
  const text = event.target.value;
  if (tecla === "Enter") {
    const dataBase = getBase(); // lê o banco e cria um item
    dataBase.push({ assignment: text, status: "" });
    setdataBase(dataBase);
    update();
    event.target.value = "";
  }
};

const removeItem = (index) => {
  const dataBase = getBase();
  dataBase.splice(index, 1);
  setdataBase(dataBase);
  update();
};

const updateItem = (index) => {
  const dataBase = getBase();
  dataBase[index].status = dataBase[index].status === "" ? "checked" : "";
  setdataBase(dataBase);
  update();
};

const clickItem = (event) => {
  const element = event.target;
  if (element.type === "button") {
    const index = element.dataset.index;
    removeItem(index);
  } else if (element.type === "checkbox") {
    const index = element.dataset.index;
    updateItem(index);
  }
};

/* Observa o evento de preciona tecla */
document.getElementById("newinput").addEventListener("keypress", newAssignment);
document.getElementById("todoList").addEventListener("click", clickItem);
// atualiza tela
update();
