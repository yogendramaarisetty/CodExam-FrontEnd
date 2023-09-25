import React, { useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import DarkModeToggle from "./DarkModeToggle";
import "./style.css";
import judgeService from "./service";
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";

const service = new judgeService(
  "cf4305d31bmsh82518687544739ep179fd2jsnf6d65d6ee270"
);
export default function CodeEditor({ codesByLanguage }) {
  const languages = ["python", "c", "cpp", "java", "csharp"];
  const [language, setLanguage] = useState("python");
  const [codes, setCodes] = useState(codesByLanguage);
  const [theme, setTheme] = useState("vs-dark");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [output, setOutput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setIsSubmitting(true);

    service
      .submitCode(languageIds[language], codes[language]["code"])
      .then((data) => {
        setIsSubmitting(false);
        console.log(data);
        var status = data.status.description;
        if (status === "Accepted") {
          setOutput(data.stdout);
        } else {
          if (status === "Compilation Error") {
            setOutput(`${status}\n ${data.compile_output}`);
          } else {
            setOutput(`${status}\n ${data.stderr} \n ${data.stdout}`);
          }
        }
        // var status = null;
        // service.getSubmissionDetails(data["token"]).then((data) => {
        //   console.log(data);
        // });
      });
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
        {isSubmitting ? (
          <ClipLoader
            color={"#123abc"} // Set the color you prefer
            loading={isSubmitting}
            size={35} // Set the size you prefer
          />
        ) : (
          <>
            <button onClick={handleRunClick}>Run</button>
            <button onClick={handleSubmitClick}>Submit</button>
          </>
        )}{" "}
      </div>
      <div className="output">
        <code>{output}</code>
      </div>
    </div>
  );
}

const languageIds = {
  python: 71,
  java: 91,
  cpp: 54,
  c: 50,
  csharp: 51
};
