const form = document.querySelector('#toDoForm');
const input = document.querySelector('#addInput');
const output = document.querySelector('#output');

let todos = [];
const fetchToDo = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos');
    const data = await res.json();
    todos = data;
    listToDos();
}

fetchToDo();

const listToDos = () => {
    output.innerHTML = ''
    todos.forEach(todo => {
        createToDoElement(todo)
    })
}

const createToDoElement = todo => {
    let card = document.createElement('div');
    card.classList.add('todo');

    let todos = document.createElement('todos');
    todos.classList.add('todos');
    todos.innerText = todo.title;

    let button = document.createElement('button');
    button.classList.add('btn', 'btn-remove');
    button.innerText = 'X';

    card.appendChild(todos);
    card.appendChild(button);
    output.appendChild(card)

    button.addEventListener('click', () => removeToDo(todo.id, card))
}

const createNewToDo = title => {
    fetch('https://jsonplaceholder.typicode.com/todos', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({
      title: title,
      completed: false
    })
  })
  .then(res => res.json())
  .then(data => {
    todos.unshift(data);
    listToDos()
    console.log(todos);
  })
}

const removeToDo = (id, todo) => {
  fetch('https://jsonplaceholder.typicode.com/posts/1', {
    method: 'DELETE',
  }); 
  todos = todos.filter(todo => todo.id !== id)
  todo.remove();
  console.log(todos);
}


form.addEventListener('submit', e => {
    e.preventDefault();
    if(input.value.trim() === '') {
      errorInput();
    } else {
      createNewToDo(input.value.trim());
      input.value = '';
      input.focus();
      successInput()
    }
    
})

const errorInput = () => {
  const error = document.querySelector('#errorMessage');
  error.classList.add('is-invalid');
  error.innerHTML = 'Please enter something to do';
}

const successInput = () => {
  const error = document.querySelector('#errorMessage');
  // error.classList.remove('is-invalid');
  error.innerHTML = '';
}