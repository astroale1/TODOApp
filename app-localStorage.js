const todoForm = document.getElementById("newTodoForm");
const todoList = document.getElementById("todoList");

// retrieve from localStorage
const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
for (let i = 0; i < savedTodos.length; i++) {
  let newTodo = document.createElement("li");
  let btnAdd3 = document.createElement('button');
  let btnAdd2 = document.createElement('button');

  btnAdd3.setAttribute('class', 'three') ;
  btnAdd3.setAttribute('type','button');
  btnAdd3.innerText = 'Complete';

  btnAdd2.setAttribute('class', 'two') ;
  btnAdd2.innerText = 'Delete Task';
  if (savedTodos[i] != null && savedTodos[i].isCompleted != null && savedTodos[i].isDeleted != null) {
    newTodo.innerText = savedTodos[i].task;
    newTodo.isCompleted = savedTodos[i].isCompleted ? true : false;
    newTodo.isDeleted = savedTodos[i].isDeleted ? true : false;

    if (newTodo.isCompleted && newTodo.isDeleted === false) {
      newTodo.classList.add('completed');

      newTodo.appendChild(document.createTextNode(' '));
      newTodo.appendChild(btnAdd2);

      todoList.appendChild(newTodo);

    } else if (newTodo.isDeleted === false && newTodo.isCompleted === false) {

      newTodo.appendChild(btnAdd3);
      newTodo.appendChild(document.createTextNode(' '));
      newTodo.appendChild(btnAdd2);

      todoList.appendChild(newTodo);
    } else if (newTodo.isDeleted) {
      delete savedTodos[i]
      localStorage.setItem("todos", JSON.stringify(savedTodos))
    }
    
  }
};

todoForm.addEventListener("submit", function(event) {

  event.preventDefault();

  let newTodo = document.createElement('li');
  let taskValue = document.getElementById("task").value;
  let btnAdd3 = document.createElement('button');
  let btnAdd2 = document.createElement('button');

  btnAdd3.setAttribute('class', 'three') ;
  btnAdd3.setAttribute('type','button');
  btnAdd3.innerText = 'Complete';

  btnAdd2.setAttribute('class', 'two') ;
  btnAdd2.innerText = 'Delete Task';

  newTodo.innerText = taskValue;

  newTodo.isCompleted = false;
  newTodo.isDeleted = false;

  newTodo.appendChild(btnAdd3);

  newTodo.appendChild(document.createTextNode(' '));

  newTodo.appendChild(btnAdd2);

  todoForm.reset();

  todoList.appendChild(newTodo);

  // save to localStorage
  savedTodos.push({ task: taskValue, isCompleted: false , isDeleted: false });
  localStorage.setItem("todos", JSON.stringify(savedTodos));
});

todoList.addEventListener("click", function(event) {
  let clickedListItem = event.target;
  const li = event.target.parentElement.firstChild.data

  console.log(li)

  
    for (let i = 0; i < savedTodos.length; i++){
      if (savedTodos[i] != null){
        if (savedTodos[i].task === li) {
          if (clickedListItem.className === 'two'){
            savedTodos[i].isDeleted = !savedTodos[i].isDeleted;
            event.target.parentElement.remove();
          } else if (clickedListItem.className === 'three') {
            clickedListItem.parentElement.classList.add('completed');
            savedTodos[i].isCompleted = !savedTodos[i].isCompleted;
            event.target.remove();
          } else {
            savedTodos[i].isCompleted = !savedTodos[i].isCompleted;
          };

    }};
    
      localStorage.setItem("todos", JSON.stringify(savedTodos))}
      
  ;}
);
