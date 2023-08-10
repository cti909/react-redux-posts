import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import MyCustomUploadAdapterPlugin from "./Uploader";

export default function MyEditor({ handleChange, ...props }) {
  console.log("ck render");
  const [data, setData] = useState("");
  useEffect(() => {
    setData(props.contentData)
  }, [props.contentData]);
  
  const editorConfiguration = {
    toolbar: {
      items: [
        "heading",
        "|",
        "bold",
        "italic",
        "|",
        "numberedList",
        "bulletedList",
        "|",
        "indent",
        "outdent",
        "|",
        "link",
        "blockQuote",
        "imageUpload",
        "insertTable",
        "mediaEmbed",
        "|",
        "undo",
        "redo",
      ],
    },
    image: {
      toolbar: ["imageTextAlternative", "imageStyle:full", "imageStyle:side"],
    },
    table: {
      contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
    },
    extraPlugins: [MyCustomUploadAdapterPlugin],
  };

  return (
    <CKEditor
      config={editorConfiguration}
      editor={ClassicEditor}
      data={data}
      onReady={(editor) => {
        editor.editing.view.change((writer) => {
          writer.setStyle(
            "height",
            "500px",
            editor.editing.view.document.getRoot()
          );
        });
      }}
      onChange={(event, editor) => {
        props.handleChangeContent(editor.getData());
        const data = editor.getData();
        console.log({ event, editor, data });
      }}
      {...props}
    />
  );
}
