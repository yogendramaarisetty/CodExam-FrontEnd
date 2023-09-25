import React from 'react';
import './style.css';
import CodeEditor from './CodeEditor';

export default function App() {
  return <CodeEditor codesByLanguage={codesByLanguage} />;
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
