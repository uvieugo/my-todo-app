import React from 'react';
import Todo from './Todo';

function TodoList(props){
    const todoComponents = props.items.map( item => {
        return <Todo 
                    key={item.id} 
                    id={item.id} 
                    text={item.text} 
                    status={item.status} 
                    handleEdit={props.handleEdit} 
                    onChange={props.handlechange} 
                    handleDestroy={props.handleDestroy}

                /> 
    })
    return(
        <div>
            <ul className="list-group">
                    {todoComponents}
            </ul>
        </div>
    )
}
export default TodoList;