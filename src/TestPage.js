import React from "react";
import SplitPane, { Pane } from "react-split-pane";
import CodeEditor from "./CodeEditor";

export default function TestPage() {
  var codes = codesByLanguage;
  var codesFromLocalStore = JSON.parse(localStorage.getItem("codes"));
  if (codesFromLocalStore) {
    codes = codesFromLocalStore;
  }
  return (
    <SplitPane split="vertical" minSize={100}>
      <div />
      <div>
        <SplitPane split="horizontal" minSize={300}>
          <Pane className="pane">
            <CodeEditor codesByLanguage={codes} />
          </Pane>
          <Pane></Pane>
        </SplitPane>
      </div>
    </SplitPane>
  );
}

const codesByLanguage = {
  python: {
    code: "print('Hello, Worlds!')\n# This is a Python sample code snippet."
  },
  java: {
    code:
      "public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println('Hello, World!');\n    }\n}"
  },
  csharp: {
    code:
      "using System;\n\nclass Program\n{\n    static void Main()\n    {\n        Console.WriteLine('Hello, World!');\n    }\n}"
  },
  cpp: {
    code:
      "#include <iostream>\n\nint main() {\n    std::cout << 'Hello, World!' << std::endl;\n    return 0;\n}"
  },
  c: {
    code:
      "#include <stdio.h>\n\nint main() {\n    printf('Hello, World!\\n');\n    return 0;\n}"
  }
};
