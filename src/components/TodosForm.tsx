import { useState, useEffect } from "react"
import { useAppDispatch } from '../app/hooks'
import { addTodo } from "../features/todos/todosSlice"
import { v4 as uuid } from "uuid"
import Select from "react-select"
import axios from 'axios'

function TodosForm() {
  const dispatch = useAppDispatch()

  const [colors, setColors] = useState([{}])
  const [title, setTitle] = useState({title: ""})
  const [selectedOption, setSelectedOption] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.get("https://www.colr.org/json/colors/random/10")
        .then(response => {
          setColors(response.data.colors)
        })
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])

  const options:Array<Object> = colors.map((color:any) => {
    if(color.tags !== undefined){
      return {
        label: color?.tags[0]?.name.toUpperCase() ?? 'ZINC',
        value: color.hex,
        id: color.id
      }
    }else{
      return{
        label: 'Default',
        value: color.hex,
        id: color.id
      }
    }
  })

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle({
      ...title,
      [e.target.name]: e.target.value,
    })
  }

  const handleOption = (e:string) => {
    setSelectedOption(e)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if(title.title !== ''){
      e.preventDefault()

      dispatch(
        addTodo({
          title: title.title,
          color: selectedOption,
          id: uuid(),
        })
      )
  
      setTitle({
        title: ""
      })
    }else{
      alert("Fill the title")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-800 max-w-sm p-4 rounded-md">
      <label className="text-sm font-bold">Todo:</label>
      <input
        type="text"
        name="title"
        onChange={handleTitle}
        value={title.title}
        className="w-full p-2 rounded-md bg-zinc-600 mb-2 border-2 border-white hover:border-neutral-400"
        placeholder="Write a title"
        autoFocus
      />
      <label className="text-sm font-bold">
        Color:
        
        <Select
          className="my-react-select-container"
          classNamePrefix="my-react-select"
          name="color"
          onChange={(selected:any) => {
            handleOption(selected.value)
          }}
          options={options}
        />
      </label>
      <button type="submit" className="bg-indigo-600 px-2 py-1 mt-3">Add todo</button>
    </form>
  );
}

export default TodosForm;