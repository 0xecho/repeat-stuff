import { store } from "./store";

export function setupUploadFile(uploadFileElement) {
  uploadFileElement.addEventListener("change", (event) => {
    store.set("uploadedFile", event.target.files[0]);
  });
}