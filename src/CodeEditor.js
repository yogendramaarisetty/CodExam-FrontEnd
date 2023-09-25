import React, { useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import DarkModeToggle from "./DarkModeToggle";
import "./style.css";

export default function CodeEditor({ codesByLanguage }) {
  const languages = ["python", "c", "cpp", "java", "csharp"];
  const [language, setLanguage] = useState("python");
  const [codes, setCodes] = useState(codesByLanguage);
  const [theme, setTheme] = useState("vs-dark");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleCodeChange = (newValue, e) => {
    const updatedCodes = JSON.parse(JSON.stringify(codes));
    updatedCodes[language]["code"] = newValue;
    setCodes(updatedCodes);
    localStorage.setItem("codes", JSON.stringify(updatedCodes));
  };

  const handleRunClick = () => {
    // Run the code
  };

  const handleSubmitClick = () => {
    // Submit the code
  };

  const handleModeChange = () => {
    console.log(isDarkMode);
    setIsDarkMode(!isDarkMode);
    setTheme(isDarkMode ? "vs-dark" : "vs");
  };

  return (
    <div>
      <div className="toolbar">
        <select value={language} onChange={handleLanguageChange}>
          {languages.map((language) => (
            <option key={language}>{language}</option>
          ))}
        </select>
        <DarkModeToggle
          onChange={handleModeChange}
          toggleText={isDarkMode ? "Light Mode" : "Dark Mode"}
        />
      </div>
      <Editor
        height="70vh"
        language={language}
        value={codes[language]["code"]}
        onChange={handleCodeChange}
        theme={theme}
      />
      <div className="bar">
        <button onClick={handleRunClick}>Run</button>
        <button onClick={handleSubmitClick}>Submit</button>
      </div>
    </div>
  );
}
