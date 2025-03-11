import React, { useState, useEffect, useRef } from "react";

export const RichTextEditor = () => {
  const [editorContent, setEditorContent] = useState("");
  const editorRef = useRef(null);

  useEffect(() => {
    const editor = editorRef.current;
    const handleInput = () => setEditorContent(editor.innerHTML);

    if (editor) {
      editor.addEventListener("input", handleInput);
    }

    return () => {
      if (editor) {
        editor.removeEventListener("input", handleInput);
      }
    };
  }, []);

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
  };

  const applyRomanNumerals = () => {
    execCommand("insertOrderedList");
    const lists = editorRef.current.getElementsByTagName("ol");
    for (let i = 0; i < lists.length; i++) {
      lists[i].style.listStyleType = "lower-roman";
    }
  };

  return (
    <div>
      <div
        ref={editorRef}
        id="editor"
        style={{
          border: "1px solid #000",
          padding: "10px",
          minHeight: "100px",
        }}
        contentEditable="true"
      >
        Hello, this is an editor.
      </div>

      {/* Editor Buttons */}
      <button onClick={() => execCommand("bold")}>Bold</button>
      <button onClick={() => execCommand("italic")}>Italic</button>
      <button onClick={() => execCommand("underline")}>Underline</button>
      <button onClick={() => execCommand("strikethrough")}>
        Strikethrough
      </button>

      <button onClick={() => execCommand("insertUnorderedList")}>
        Unordered List
      </button>
      <button onClick={() => execCommand("insertOrderedList")}>
        Ordered List (1, 2, 3)
      </button>
      <button onClick={applyRomanNumerals}>Ordered List (i, ii, iii)</button>

      <input
        type="color"
        onChange={(e) => execCommand("foreColor", e.target.value)}
      />
      <label>Text Color</label>

      <input
        type="color"
        onChange={(e) => execCommand("backColor", e.target.value)}
      />
      <label>Background Color</label>

      <select onChange={(e) => execCommand("fontSize", e.target.value)}>
        <option value="1">12px</option>
        <option value="3" selected>
          16px
        </option>
        <option value="4">24px</option>
        <option value="5">32px</option>
      </select>
      <label>Font Size</label>

      <button onClick={() => execCommand("justifyLeft")}>Align Left</button>
      <button onClick={() => execCommand("justifyCenter")}>Align Center</button>
      <button onClick={() => execCommand("justifyRight")}>Align Right</button>
      <button onClick={() => execCommand("justifyFull")}>Justify</button>

      <button onClick={() => execCommand("insertHorizontalRule")}>
        Horizontal Line
      </button>

      <p>Current Content:</p>
      <div>{editorContent}</div>
    </div>
  );
};

export default RichTextEditor;
