import { BrowserRouter, Route, Routes } from "react-router-dom";
import TaskManager from "./components/TaskManager";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/task" element={<TaskManager />}></Route>
          <Route path="/signup" element={<SignUp />} />
          <Route  path="/" element={<Login/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
