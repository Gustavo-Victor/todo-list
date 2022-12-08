// Elements selection / variables
const todoform = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const todolist = document.querySelector("#todo-list");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const searchInput = document.querySelector("#search-input");
const filterSelect = document.querySelector('#filter-select');
let oldInputValue;
let database = {items: []};


// Functions 
const setData = (data) => {
    localStorage.setItem('database', JSON.stringify(data));
}

const getData = () => {
    return JSON.parse(localStorage.getItem('database')) || {items:[]};
}

const createTodo = () => {
    database = getData();
    const items = database.items; 
    displayTodo(items);
}

const displayTodo = (items) => {
    todolist.innerHTML = '';
    if(items.length > 0) {
        items.forEach((item, index) => {            
            let div = document.createElement('div');
            
            if(item.status == 'done') {
                div.setAttribute('class', 'done');
            }else {
                div.removeAttribute('class', 'done');
            }
            div.setAttribute('id', 'id'+index); 
                        
            div.innerHTML = `
                <h3>${item.title}</h3>
                <div class='buttons'>
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

            if(!div.classList.contains('todo')){
                div.classList.add('todo');
            }
            todolist.append(div);            
        })
    }
}

const getTodoId = (text) => {
    database = getData();
    let myData = {};
    database.items.filter(item => {
       if(item.title == text) {
            myData = item;
            return;
       }
    });  
    return database.items.indexOf(myData);
}

const removeTodo = (text) => {
    let id = getTodoId(text);  
    console.log(id);
    database.items.splice(id, 1);
    setData(database);  
    displayTodo(database.items);
}

const toggleForm = () => {
    editForm.classList.toggle('hide');
    todoform.classList.toggle('hide');
}

const updateTodo = (text) => {   
    database = getData(); 
    let id = getTodoId(oldInputValue);           
     database.items[id].title = text;
     setData(database);
     displayTodo(database.items);
     console.log(id);   
}

const updateTodoStatus = (text) => {
    let id = getTodoId(text);
    console.log(id);
    let st = database.items[id].status;
    if(st == 'todo') {
        st = 'done';
    }else {
        st = 'todo';
    }
    database.items[id].title = text;
    database.items[id].status = st;
    console.log(database.items[id]);
    setData(database);    
    displayTodo(database.items);
}


// Events
todoform.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const inputValue = todoInput.value;
    console.log(todoInput.id);
    
    if(inputValue.length == 0) {
        console.error("Preencha o campo...");
    } else {
        todoInput.value = '';
        database.items.push({title: inputValue, status: 'todo'});
        setData(database);
        createTodo();
    }   
});


todolist.addEventListener('click', (e) => {
    const targetEl = e.target;
    const buttonsDiv = targetEl.parentElement;
    const titleSibling = buttonsDiv.previousElementSibling;
    const parentTodo = titleSibling.parentElement;
    let todoTitle;

    console.log(targetEl, buttonsDiv, titleSibling, parentTodo);

    if(parentTodo && titleSibling) {
        todoTitle = titleSibling.innerText;
    }
    
    if(targetEl.classList.contains('finish-todo')){ 
        updateTodoStatus(todoTitle);
    }

    if(targetEl.classList.contains('edit-todo')){
        editInput.value = todoTitle;    
        oldInputValue = todoTitle;
        toggleForm();
    }

    if(targetEl.classList.contains('delete-todo')){        
        removeTodo(todoTitle);               
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
    toggleForm();
});

searchInput.addEventListener('input', (e) => {    
    e.preventDefault();
    let searchValue = searchInput.value;
    database = getData();
    const filteredItems = [];
    
    database.items
    .filter(item => {
        return item.title.toLowerCase().includes(searchValue.toLowerCase());         
    })
    .forEach(filteredItem => {
        console.log(filteredItem);
        filteredItems.push(filteredItem);
    });
    displayTodo(filteredItems);
});

filterSelect.addEventListener('change', (e) => {
    e.preventDefault();
    database = getData();
    let selectValue = e.target.value;
    let myFilteredArray = [];

    switch(selectValue) {
        case 'todo':
            myFilteredArray = database.items.filter(item => item.status == 'todo');
        break;

        case 'done': 
            myFilteredArray = database.items.filter(item => item.status == 'done');
        break;

        default: 
            myFilteredArray = database.items;
    }
    // console.log(myFilteredArray);
    displayTodo(myFilteredArray);
})

//check database and update information
createTodo();