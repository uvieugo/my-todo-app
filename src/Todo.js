import React from 'react';

function Todo(props){
    return(
            <li className="list-group-item">
                <input 
                    type="checkbox" 
                    name="status"
                    onChange={() => props.onChange(props.id)}
                    checked={props.status}
                    />
               <p className={props.status ? "complete" : null}>{props.text}</p>
               <div className="button-group">
                    <button onClick={() => props.handleEdit(props.id)}>Edit</button>
                    <button onClick={() => props.handleDestroy(props.id)}>Delete</button>

               </div>
            </li>
 
    )
}

export default Todo;