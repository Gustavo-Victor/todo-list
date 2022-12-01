// Elements selection
const todoform = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const todolist = document.querySelector("#todo-list");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
let oldInputValue;


// Functions 
const saveTodo = (text) => {
    todolist.innerHTML += `
    <div class="todo">
        <h3>${text}</h3>
        <button class="finish-todo">
            <i class="fa-solid fa-check"></i>
        </button>
        <button class="edit-todo">
            <i class="fa-solid fa-pen"></i>
        </button>
        <button class="delete-todo">
            <i class="fa-solid fa-xmark"></i>
        </button>
    </div>
    `;
}

const toggleForm = () => {
    editForm.classList.toggle('hide');
    todoform.classList.toggle('hide');
}

const updateTodo = (text) => {
    const allTodos = document.querySelectorAll('.todo');

    allTodos.forEach(todo => {
        let title = todo.querySelector('h3');
        if(title.innerText === oldInputValue){
            title.innerText = text;            
        }
    });
}

// Events
todoform.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputValue = todoInput.value;
    
    if(inputValue.length == 0) {
        console.error("Preencha o campo...");
    } else {
        console.log("Tudo ok");
        saveTodo(inputValue);
        todoInput.value = '';
    }   
});


todolist.addEventListener('click', (e) => {
    const targetEl = e.target;
    const parentTodo= targetEl.parentElement;
    let todoTitle;

    if(parentTodo && parentTodo.querySelector('h3')) {
        todoTitle = parentTodo.querySelector('h3');
    }
    
    if(targetEl.classList.contains('finish-todo')){ 
        parentTodo.classList.toggle('done');
    }

    if(targetEl.classList.contains('edit-todo')){
        editInput.value = todoTitle.innerText;    
        oldInputValue = todoTitle.innerText;
        toggleForm();
    }

    if(targetEl.classList.contains('delete-todo')){
        todolist.removeChild(parentTodo);
    }
    
});


cancelEditBtn.addEventListener('click', (e) => {
    e.preventDefault();
    toggleForm();
});

editForm.addEventListener('submit', (e) => {
    e.preventDefault();    
    
    const editInputValue = editInput.value; 
    if(editInputValue) {
        updateTodo(editInputValue);
    }
    console.log('editado com sucesso!');
    toggleForm();
});