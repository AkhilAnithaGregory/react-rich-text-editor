# React Rich Text Editor

A lightweight, easy-to-use rich text editor for React that converts designed text into HTML format.

## Features

- Rich text formatting (bold, italics, underline, etc.)
- Text alignment (left, right, center, justify)
- Lists (ordered, unordered)
- Converts designed text into clean HTML output

## Installation

To install the package, use npm:

```bash
npm install react-text-editor-rte

or

yarn add react-text-editor-rte

```

## usage

```bash
import { useState } from "react";
import RichTextEditor from 'react-text-editor-rte';

function App() {
  const [editorContent, setEditorContent] = useState("");
  const handleEditorChange = (content: any) => {
    setEditorContent(content);
  };
  return (
    <div>
      <RichTextEditor getValue={handleEditorChange} />
    </div>
  );
}

export default App;

```
