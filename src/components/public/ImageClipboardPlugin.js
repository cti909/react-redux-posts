import React from "react";

class ImageClipboardPlugin {
  constructor(loader) {
    this.loader = loader;
  }

  init() {
    const editor = this.loader;
    editor.editing.clipboard.on("inputTransformation", (evt, data) => {
      if (data.dataTransfer.types.includes("Files")) {
        const file = data.dataTransfer.files[0];
        if (file && file.type.includes("image")) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const imageSrc = event.target.result;
            editor.model.change((writer) => {
              const imageElement = writer.createElement("image", {
                src: imageSrc,
              });
              editor.model.insertContent(
                imageElement,
                editor.model.document.selection
              );
            });
          };
          reader.readAsDataURL(file);
          evt.stop();
        }
      }
    });
  }
}

export default ImageClipboardPlugin;
