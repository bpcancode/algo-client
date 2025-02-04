import SampleSplitter from "../../components/ui/spitter";
import { cn } from "../../utils/cn";
import "./codeEditor.css";
import { Editor } from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchAlgorithms, fetchVisulization, likeVisulization } from "../../services/apiService";
import { Algorithm, Visulization } from "../../models/models";
import { useDebounce } from "../../hooks/useDbounce";
import Select from 'react-select';
import { FaHeart } from "react-icons/fa";

const CodeViewer = (): JSX.Element => {
  const { id } = useParams();
  const [visualization, setVisualization] = useState<Visulization | null>(null);
  const [html, setHtml] = useState<string>("");
  const [css, setCss] = useState<string>("");
  const [js, setJs] = useState<string>("");

  const debouncedSetHtml = useDebounce(setHtml, 2000);
  const debouncedSetCss = useDebounce(setCss, 2000);
  const debouncedSetJs = useDebounce(setJs, 2000);


  const [liked, setLiked] = useState<boolean>(false);

  useEffect(() => {
    fetchVisulization(Number(id))
      .then((res) => {
        if (res.isSuccess) {
          setVisualization(res.data);
          setHtml(res.data?.html ?? "");
          setCss(res.data?.css ?? "");
          setJs(res.data?.js ?? "");
          if(res.data?.isVoted){
            setLiked(true);
          }
        } else {
          console.error(res.errorMessage);
        }
      })
      .catch((err) => console.error(err));
  }, [id, liked]);

  function handleHtmlChange(value: string | undefined) {
    debouncedSetHtml(value ?? "");
  }
  function handleCssChange(value: string | undefined) {
    debouncedSetCss(value ?? "");
  }
  function handleJsChange(value: string | undefined) {
    debouncedSetJs(value ?? "");
  }

  function handleLike(){
    likeVisulization(visualization?.id!)
    .then((res) => { 
      if(res.isSuccess){
        setLiked(!liked);
      } else {
        console.error(res.errorMessage);
      }
    })
    .catch((err) => console.error(err));
  }

  return (

    <div className="flex flex-column h-screen bg-dark font-mono color-white overflow-hidden">
    <nav className="flex justify-between items-center bg-darker p-4 border-b border-gray-700">
      <input type="text" className="text-lg focus:outline-none" value={visualization?.title}/>
      <p className="text-lg">{visualization?.algorithm}</p>
      <button className="text-white px-4 py-2 rounded cursor-pointer" onClick={handleLike}><FaHeart size={25} className={liked ? "text-red-400" : ""} /></button>
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
  </div>
  );
};

export default CodeViewer;
