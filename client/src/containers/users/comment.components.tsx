import React, { useRef } from "react";

// import MonacoEditor from "monaco-editor";

// export default function App() {
//     const editorRef = useRef(null);

//     function handleEditorDidMount(editor, monaco) {
//         editorRef.current = editor;
//     }
//     function handleEditorChange(value, event) {
//         console.log("here is the current model value:", value);
//     }
//     //   function showValue() {
//     //       if(editorRef!== null)
//     //     editorRef&&  editorRef.current && alert(editorRef.current.getValue());
//     //   }

//     return (
//         <>
//             {/* <button onClick={showValue}>Show value</button> */}
//             <MonacoEditor
//                 height="90vh"
//                 theme="vs-dark"
//                 defaultLanguage="javascript"
//                 defaultValue="// some comment"
//                 onMount={handleEditorDidMount}
//                 onChange={handleEditorChange}
//             />
//         </>
//     );
// }
