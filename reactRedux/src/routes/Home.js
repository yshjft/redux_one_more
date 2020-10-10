import React, {useState} from "react";
import {connect} from "react-redux";
import {actionCreators} from "../store";
import ToDo from "../components/ToDo";

function Home({toDos, addToDo}){
    const [text, setText] = useState("");
    function onChange(e){
        setText(e.target.value);
    }
    function onSubmit(e){
        e.preventDefault();
        addToDo(text);
        setText("");
    }

    return(
        <div>
            <h1>To Do</h1>
            <form onSubmit={onSubmit}>
                <input type="text" value={text} onChange={onChange} />
                <button>Add</button>
            </form>
            <ul>
                {toDos.map((toDo, index) => (<ToDo key={index} {...toDo}/>))}
            </ul>
        </div>
    );
}

function mapStateToProps(state){
    return {toDos : state};
}

function mapDispatchToProps(dispatch){
    return {
        addToDo : (text) => dispatch(actionCreators.addToDo(text))
    };
}


// connect : store를 component에 연결한다.
// mapStateToProps : store의 state를 가지고 와 props로 제공한다. 따라서 props를 추가할 수 있다)
// mapDispatchToProps :  receives the dispatch() method, returns callback props that you want to inject into the presentational component.
export default connect(mapStateToProps, mapDispatchToProps)(Home);