import {createStore} from "redux";
const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO ="ADD_TODO"
const DELETE_TODO ="DELETE_TODO"


//action creator
const addTodo = (text) =>{
    return {
        type : ADD_TODO,
        text 
    };
};

const deleteTodo = (id) =>{
    return {
        type : DELETE_TODO,
        id
    };
};



const reducer = (state=[], action) => {
    switch(action.type){
        case ADD_TODO:
            return [...state, {text : action.text, id : Date.now()}];
        case DELETE_TODO:
            return state.filter(toDo => toDo.id !== parseInt(action.id));
        default:
            return state;
    }
};

const store = createStore(reducer);

const dispatchAddTodo = (text) =>{
    store.dispatch(addTodo(text))
}

const dispatchDeleteTodo = (e) =>{
    const id  = e.target.parentNode.id;
    store.dispatch(deleteTodo(id));
}

const paintToDos = () =>{
    const toDos = store.getState();
    ul.innerHTML = "";
    toDos.forEach(toDo =>{
        const li = document.createElement("li");
        const btn = document.createElement("button");
        btn.addEventListener("click", dispatchDeleteTodo);
        btn.innerText="delete";
        li.id = toDo.id;
        li.innerText = toDo.text;
        li.appendChild(btn);
        ul.appendChild(li);
    })
}

store.subscribe(paintToDos);

const onSubmit = e =>{
    e.preventDefault();
    const toDo = input.value;
    input.value = "";
    dispatchAddTodo(toDo);
}

form.addEventListener("submit", onSubmit); 