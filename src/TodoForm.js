import React from 'react';

function TodoForm(props){
    return(
        <div >
            <form className="todo-form">
                <textarea 
                    type="text"
                    name="text"
                    value={props.text}
                    placeholder="Add Text Here"
                    onChange={props.handleChange}

                />
                <div className="button-group">
                    <button onClick={props.formButtonClick}>{props.isEdit ? "Update" : "Add" }</button>
                    <button style={props.isEdit ? null : {display: 'none'}} onClick={props.formButtonClick}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default TodoForm