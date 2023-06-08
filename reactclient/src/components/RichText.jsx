import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

export function RichTextEditor1({ title = true }) {
  const editorRef = useRef(null);
  const [value, setValue] = useState("");
  const log = () => {
    if (editorRef.current) {
      //   console.log(editorRef.current.getContent());
      setValue(editorRef.current.getContent());
    }
  };
  return (
    <>
      {title ? <h1>RichTextEditor1</h1> : <h1 hidden>RichTextEditor1</h1>}
      <Editor
        apiKey="your-api-key"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue="<p>This is the initial content of the editor.</p>"
        init={{
          height: 300,
          menubar: true,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
      <button className="btn btn-primary" onClick={log}>
        Submit
      </button>
      <br />
      <div>{Parser(value)}</div>
    </>
  );
}

import React, { useState } from "react";
import Parser from "html-react-parser";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export function RichTextEditor2({ title = true }) {
  const [value, setValue] = useState("");
  //   console.log(value);

  return (
    <section>
      <div>
        {title ? <h1>RichTextEditor2</h1> : <h1 hidden>RichTextEditor2</h1>}
        <ReactQuill theme="snow" value={value} onChange={setValue} />
      </div>
      <div>{Parser(value)}</div>
    </section>
  );
}
