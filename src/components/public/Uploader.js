import axios from "axios";
import { API_URL, UPLOAD_ENDPOINT } from "../../constants/config";

class MyUploadAdapter {
  constructor(loader) {
    // The file loader instance to use during the upload.
    this.loader = loader;
  }

  // Starts the upload process.
  upload() {
    return this.loader.file.then((file) => {
      console.log(this.loader);
      const data = new FormData();
      data.append("image", file);

      return axios
        .post(`${API_URL}${UPLOAD_ENDPOINT}`, data)
        .then((response) => {
          return {
            default: response.data,
          };
        })
        .catch((error) => {
          console.error("Upload error:", error);
        });
    });
  }

  // Aborts the upload process.
  abort() {
    if (this.xhr) {
      this.xhr.abort();
    }
  }
}

// upload image
function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    // console.log(loader)
    // loader: file
    return new MyUploadAdapter(loader);
  };
}

export default MyCustomUploadAdapterPlugin;
