import {  Route, Routes } from "react-router";
import Sidebar from "./components/sideBar";
import ViewVisulization from "./pages/Visulization/viewVisulization";
import CodeEditor from "./pages/editor/codeEditor";


function App() {
  return (
    <>

    <Routes>
      <Route path="/" element={<Sidebar >
        <ViewVisulization />
      </Sidebar>} />
      <Route path="/editor" element={< CodeEditor/>} />
    </Routes>

    </>
  );
}

export default App;
