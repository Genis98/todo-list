import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TodosList from "./components/TodosList";

function App() {
  return (
    <div className="text-white">
      <div className="flex items-center justify-center">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<TodosList />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
