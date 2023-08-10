import React, { Component, useEffect, useRef, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic/build/ckeditor";
import SimpleUploadAdapter from "@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter";
import DecoupledEditor from "@ckeditor/ckeditor5-editor-decoupled/src/decouplededitor";
import Uploader from "./Uploader";

const CustomCKEditor = () => {
  const [uploadUrl, setUploadUrl] = useState();
  const editor = useRef(null);
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
    placeholderConfig: {
      types: ["Name", "DOB"],
    },
    simpleUpload: {
      // Define your upload URL here
      uploadUrl: "YOUR_IMAGE_UPLOAD_URL",
      // Adapt the following to your backend's response
      headers: {
        "X-CSRF-TOKEN": "CSRF-Token",
        Authorization: "Bearer Token",
      },
      
    },
    plugins: [SimpleUploadAdapter /* other plugins */],
  };
  return (
    <div className="App">
      <CKEditor
        ref={editor}
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          console.log("Editor is ready to use!", editor);
        }}
        
        editor={DecoupledEditor}
        config={editorConfiguration}
        data="<p>Hello from CKEditor&nbsp;5!</p>"
        onChange={(event, editor) => {
          const data = editor.getData();
          console.log({ event, editor, data });

          // Xử lý sự kiện tải lên hình ảnh và chèn URL vào nội dung
          if (event && event.name === "fileUploadRequest") {
            const fileLoader = editor.plugins
              .get("FileRepository")
              .createLoader(event.file);
            fileLoader.on("uploaded", (info) => {
              // Chèn hình ảnh vào nội dung
              editor.model.change((writer) => {
                const imgElement = writer.createElement("image", {
                  src: info.url,
                });
                editor.model.insertContent(
                  imgElement,
                  editor.model.document.selection
                );
              });
            });
            fileLoader.upload();
          }
        }}
        // onBlur={(event, editor) => {
        //   console.log("Blur.", editor);
        // }}
        // onFocus={(event, editor) => {
        //   console.log("Focus.", editor);
        // }}
      />
    </div>
  );
};

export default CustomCKEditor;
