import React, {useState, useEffect} from 'react';
import TodoList from './TodoList';
import TodoForm from './TodoForm';
import {get, update, create, destroy} from './GetData'

function App(){
    const [ isLoading, setIsLoading ] = useState(true)
    const [ todoData, setTodoData ] = useState([])
    const [ text, setText ] = useState("")
    // const [ status, setStatus ] = useState(false)
    const [ isEdit, setIsEdit] = useState(false)
    const [ currentEdit, setCurrentEdit ] = useState({})

    useEffect( () => {
        get()
        .then(data => {
            setIsLoading(false)
            setTodoData(data)
        })
    },[])
    
    function handlechange (id){
        setTodoData( prevState => {
            const updatedTodo = prevState.map(todo => {
                if (todo.id === id){
                    let newTodo = {
                        ...todo,
                        status: !todo.status
                    }
                    update(newTodo)
                    return newTodo
                }
                return todo
            })
            return updatedTodo
        })
    }

    function formButtonClick(e){
        e.preventDefault()
        if (e.target.innerHTML === 'Add'){
            let todo = {
                text: text,
                status: false
            }
             create(todo)
            .then(data => {
                setTodoData( prevTodoData => {
                    const newTodoData = [...prevTodoData]
                    newTodoData.push(data)
                    return newTodoData
                })
                setText("")
                // setStatus(false)
            })
        }else if(e.target.innerHTML === 'Update'){
            setTodoData( prevState => {
                const updatedTodo = prevState.map(todo => {
                    if (todo.id === currentEdit.id){
                        let newTodo = {
                            id: currentEdit.id,
                            text: text,
                            status: currentEdit.status
                        }
                        update(newTodo)
                        return newTodo
                    }
                    return todo
                })
                return updatedTodo
            })
            setIsEdit(false)
            setText("")
            setCurrentEdit({})         
        }else if(e.target.innerHTML === 'Cancel'){
            console.log(e.target.innerHTML)
            setIsEdit(false)
            setText("")
            setCurrentEdit({})
        }else{
            
        }

    }

    function formHandleChange (e){
        let updatedT = e.target.value
        setText(updatedT)
    }

    function handleDestroy(id){
        setTodoData( prevState => {
            const updatedTodo = prevState.filter(todo => {
                return todo.id !== id
            })
            destroy(id)
            console.log(updatedTodo)
            return updatedTodo
        })
    }

    function handleEdit(id){
        setIsEdit(true)
        for (const todo of todoData) {
            if (todo.id === id ) {
                setCurrentEdit(todo)
                setText(todo.text)
            };
          }
    }
    return(
        
                    <div className="todo-list">
                        { isLoading ? 
                        <div>Loading.....</div> 
                        : <>
                        <h3>Todo List</h3>
                        <TodoList items={todoData} handlechange={handlechange} handleDestroy={handleDestroy} handleEdit={handleEdit}/>
                        <TodoForm text={text} isEdit={isEdit} handleChange={formHandleChange} formButtonClick={formButtonClick}/>
                        </>}
                        
                    </div>
         
    )
}

export default App;