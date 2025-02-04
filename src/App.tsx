import { Route, Routes } from "react-router";
import Sidebar from "./components/sideBar";
import ViewVisulization from "./pages/Visulization/viewVisulization";
import CodeEditor from "./pages/editor/codeEditor";
import Auth from "./pages/auth/auth";
import "react-toastify/dist/ReactToastify.css";
import CodeViewer from "./pages/editor/codeViewer";


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
        <Route path="/editor" element={<CodeEditor />} />
        <Route path="/view/:id" element={<CodeViewer />} />
        <Route path="/login" element={<Auth type="login" />} />
        <Route path="/register" element={<Auth type="register" />} />
      </Routes>
    </>
  );
}

export default App;
