import SampleSplitter from "../../components/ui/spitter";
import { cn } from "../../utils/cn";
import "./codeEditor.css";
import { Editor } from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { createVisulization, fetchAlgorithms } from "../../services/apiService";
import { Algorithm, CreateVisulizationModel, Visulization } from "../../models/models";
import { useDebounce } from "../../hooks/useDbounce";
import { Bounce, ToastContainer, toast } from "react-toastify";
import Select from 'react-select';

const CodeEditor = (): JSX.Element => {
  const [visualization] = useState<Visulization | null>(null);
  const [html, setHtml] = useState<string>("");
  const [css, setCss] = useState<string>("");
  const [js, setJs] = useState<string>("");

  const debouncedSetHtml = useDebounce(setHtml, 2000);
  const debouncedSetCss = useDebounce(setCss, 2000);
  const debouncedSetJs = useDebounce(setJs, 2000);
  const [title, setTitle] = useState<string>("Untitled");
  const [algorithms, setAlgorithms] = useState<Algorithm[]>([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<Algorithm | null>(null);

  useEffect(() => {
      fetchAlgorithms().then((res) => {
        if (res.isSuccess) {
          setAlgorithms(res.data ?? []);
        } else {
          
        }
      }).catch((err) => console.error(err));
  }, []);

  function handleHtmlChange(value: string | undefined) {
    debouncedSetHtml(value ?? "");
  }

  function handleCssChange(value: string | undefined) {
    debouncedSetCss(value ?? "");
  }

  function handleJsChange(value: string | undefined) {
    debouncedSetJs(value ?? "");
  }

  function handleSave() {

    if(!selectedAlgorithm) {
      return;
    }
    const data : CreateVisulizationModel = {
      title,
      html,
      css,
      js,
      algorithmId: selectedAlgorithm.id
    }
    createVisulization(data).then((res) => {
      if (res.isSuccess) {
        toast.success("Visualization Saved Successfully");
      } else {
        toast.error(res.errorMessage);
      }
    }).catch((_err) => toast.error("Something went wrong. Please try again"));
  };

  return (
    <div className="flex flex-column h-screen bg-dark font-mono color-white overflow-hidden">
    <nav className="flex justify-between items-center bg-darker p-4 border-b border-gray-700">
      <input type="text" className="text-lg focus:outline-none" value={title} onChange={(e) => setTitle(e.target.value)}/>
      <Select 
        className="basic-single w-96 bg-dark"
        styles={{ control: (base) => ({ ...base, backgroundColor: "#2d3748", color: "black" }) }}
        classNamePrefix="select Algorithm"
        options={algorithms.map(x => ({ value: x.id, label: x.title}))}
        onChange={(selectedOption) => setSelectedAlgorithm(algorithms.find(x => x.id === selectedOption?.value) ?? null)}
         />
      <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" onClick={handleSave}>Save</button>
    </nav>
    <div className="flex flex-column h-full p-5">
      <div className="flex grow">
        <div className={cn("shrink-0 contents")} style={{ width: 650 }}>
          <p className="w-full ml-12">HTML</p>
          <Editor
            defaultLanguage="html"
            value={html}
            onChange={handleHtmlChange}
          />
        </div>
        <SampleSplitter />
        <div className="flex grow">
          <div className="grow bg-darker contents">
            <p className="w-full ml-12">CSS</p>
            <Editor
              defaultLanguage="css"
              value={css}
              onChange={handleCssChange}
            />
          </div>
          <SampleSplitter />
          <div className={cn("shrink-0 contents")} style={{ width: 650 }}>
            <p className="w-full ml-12">JAVASCRIPT</p>
            <Editor
              defaultLanguage="javascript"
              value={js}
              onChange={handleJsChange}
            />
          </div>
        </div>
      </div>
      <SampleSplitter dir="horizontal" />
      <div className="shrink-0 bg-white" style={{ height: 450 }}>
        <iframe
          srcDoc={`<!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charset="UTF-8">
            <title>${visualization?.title}</title>
            <style>${css}</style>
            </head>
            <body>
            ${html}
            <script>${js}</script>
            </body>
            </html>`}
          className="w-full h-full"
          title={visualization?.title}
        />
      </div>
    </div>
    <ToastContainer
      position="top-right"
      transition={Bounce}
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover />
  </div>
  );
};

export default CodeEditor;
