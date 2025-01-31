import SampleSplitter from "../../components/ui/spitter";
import { cn } from "../../utils/cn";
import "./codeEditor.css";
import { Editor } from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchVisulization } from "../../services/apiService";
import { Visulization } from "../../models/models";
import { useDebounce } from "../../hooks/useDbounce";

const CodeEditor = (): JSX.Element => {
  const { id } = useParams();
  const [visualization, setVisualization] = useState<Visulization | null>(null);
  const [html, setHtml] = useState<string>("");
  const [css, setCss] = useState<string>("");
  const [js, setJs] = useState<string>("");

  const debouncedSetHtml = useDebounce(setHtml, 2000);
  const debouncedSetCss = useDebounce(setCss, 2000);
  const debouncedSetJs = useDebounce(setJs, 2000);

  useEffect(() => {
    fetchVisulization(Number(id))
      .then((res) => {
        if (res.isSuccess) {
          setVisualization(res.data);
          setHtml(res.data?.html ?? "");
          setCss(res.data?.css ?? "");
          setJs(res.data?.js ?? "");
        } else {
          console.error(res.errorMessage);
        }
      })
      .catch((err) => console.error(err));
  }, [id]);

  function handleHtmlChange(value: string | undefined) {
    debouncedSetHtml(value ?? "");
  }

  function handleCssChange(value: string | undefined) {
    debouncedSetCss(value ?? "");
  }

  function handleJsChange(value: string | undefined) {
    debouncedSetJs(value ?? "");
  }

  return (
    <div className="flex flex-column h-screen bg-dark font-mono color-white overflow-hidden p-5">
      <div className="flex grow">
        <div className={cn("shrink-0 contents")} style={{ width: 650 }}>
          <Editor defaultLanguage="html" value={html} onChange={handleHtmlChange} />
        </div>
        <SampleSplitter />
        <div className="flex grow">
          <div className="grow bg-darker contents">
            <Editor defaultLanguage="css" value={css} onChange={handleCssChange} />
          </div>
          <SampleSplitter />
          <div className={cn("shrink-0 contents")} style={{ width: 650 }}>
            <Editor defaultLanguage="javascript" value={js} onChange={handleJsChange} />
          </div>
        </div>
      </div>
      <SampleSplitter dir="horizontal" />
      <div className="shrink-0" style={{ height: 500 }}>
        <iframe
          srcDoc={`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>${visualization?.title}</title>
<style>${css}</style>
</head>
<body style="background: white;">
${html}
<script>${js}</script>
</body>
</html>`}
          className="w-full h-full"
          title={visualization?.title}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
