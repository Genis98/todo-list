import { useAppSelector, useAppDispatch } from '../app/hooks'
import { deleteTodo } from "../features/todos/todosSlice"
import TodosForm from "../components/TodosForm"
import { TodoState } from '../features/todos/todosSlice'

function TodosList() {
  const todos = useAppSelector((state) => state.todos)
  const dispatch = useAppDispatch()

  const handleDelete = (id:TodoState) => {
    dispatch(deleteTodo(id))
  }
  
  return (
    <div>
      <header className="text-center uppercase py-5">
        <h1>Todo list app ({todos.length})</h1>
      </header>
      <div className="form flex justify-center py-5">
        <TodosForm />
      </div>
      {todos.length > 0 &&
        <div className="todos mt-5 mb-5 bg-zinc-800 rounded-md">
          <h2 className="text-center py-3">List</h2>
          {todos.map((todo:any) => (
            <div className="p-4" style={{backgroundColor: '#'+todo.color}} key={todo.id}>
              <header className="flex justify-between">
                <h3 className="text-lg font-bold">{todo.title}</h3>
                <div className="flex gap-x-2">
                  <button
                    onClick={() => handleDelete(todo.id)}
                    className="bg-red-500 px-2 py-1 text-xs rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </header>
            </div>
          ))}
        </div>
      }
      
    </div>
  )
}

export default TodosList