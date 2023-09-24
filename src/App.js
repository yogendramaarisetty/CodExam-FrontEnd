import React, { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import './style.css';

export default function App() {
  const languages = ['python', 'c', 'cpp', 'java', 'csharp'];
  const [language, setLanguage] = useState('python');
  const [codes, setCodes] = useState(codesByLanguage);
  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    // here is the editor instance
    // you can store it in `useRef` for further usage
    editorRef.current = editor;
  }

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleCodeChange = (newValue, e) => {
    const updatedCodes = codes.slice();
    updatedCodes[language]['code'] = newValue;
    setCodes(updatedCodes);
    localStorage.setItem('codes', JSON.stringify(updatedCodes));
  };

  const handleRunClick = () => {
    // Run the code
  };

  const handleSubmitClick = () => {
    // Submit the code
  };

  const options = {
    language,
  };
  return (
    <div>
      <div className="toolbar">
        <select value={language} onChange={handleLanguageChange}>
          {languages.map((language) => (
            <option key={language}>{language}</option>
          ))}
        </select>
      </div>
      <Editor
        height="70vh"
        language={language}
        value={codes[language]['code']}
        onChange={handleCodeChange}
      />
      ;
      <div className="bar">
        <button onClick={handleRunClick}>Run</button>
        <button onClick={handleSubmitClick}>Submit</button>
      </div>
    </div>
  );
}

const codesByLanguage = {
  python: {
    code: "print('Hello, World!')\n# This is a Python sample code snippet.",
  },
  java: {
    code: "public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println('Hello, World!');\n    }\n}",
  },
  csharp: {
    code: "using System;\n\nclass Program\n{\n    static void Main()\n    {\n        Console.WriteLine('Hello, World!');\n    }\n}",
  },
  cpp: {
    code: "#include <iostream>\n\nint main() {\n    std::cout << 'Hello, World!' << std::endl;\n    return 0;\n}",
  },
  c: {
    code: "#include <stdio.h>\n\nint main() {\n    printf('Hello, World!\\n');\n    return 0;\n}",
  },
};
