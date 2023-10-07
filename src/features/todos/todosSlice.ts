import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from '../../app/store'

export interface TodoState {
  id: string,
  title: string,
  color: string
}

const initialState: TodoState[] = [
  {
    id: "1",
    title: "Todo 1",
    color: "196475"
  }
];

const userSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<TodoState>) => {
      state.push(action.payload);
    },
    deleteTodo: (state, action: PayloadAction<TodoState>) => {
      const foundTodo = state.find((todo:any) => todo.id === action.payload);
      if (foundTodo) {
        state.splice(state.indexOf(foundTodo), 1);
      }
    },
  },
});

export const { addTodo, deleteTodo } = userSlice.actions;
export const selectCount = (state: RootState) => state.todos
export default userSlice.reducer;