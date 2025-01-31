import { Route, Routes } from "react-router";
import Sidebar from "./components/sideBar";
import ViewVisulization from "./pages/Visulization/viewVisulization";
import CodeEditor from "./pages/editor/codeEditor";
import Auth from "./pages/auth/auth";
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Sidebar>
              <ViewVisulization />
            </Sidebar>
          }
        />
        <Route path="/editor/:id" element={<CodeEditor />} />
        <Route path="/login" element={<Auth />} />
      </Routes>
    </>
  );
}

export default App;
