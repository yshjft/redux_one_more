import React from 'react';
import {connect} from 'react-redux';
import {actionCreators} from "../store";
import {Link} from "react-router-dom";

function ToDo({text, onBtnClick, id}){
    return (
        <li>
            <Link to={`/${id}`}>
                {text} <button onClick={onBtnClick}>DEL</button>
            </Link>
        </li>
    );
}

// ownProps : 현재 이 컴포넌트에서 받고 있는 props들
function mapDispatchToProps(dispatch, ownProps){
    return{
        onBtnClick : () => dispatch(actionCreators.deleteToDo(ownProps.id))
    }
}

export default connect(null, mapDispatchToProps)(ToDo);