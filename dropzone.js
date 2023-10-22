import { store } from "./store";

export function setupDropzone(dropZoneElement) {
  dropZoneElement.addEventListener("dragover", (event) => {
    event.preventDefault();
    dropZoneElement.classList.add("dragover");
  });
  dropZoneElement.addEventListener("dragleave", (event) => {
    event.preventDefault();
    dropZoneElement.classList.remove("dragover");
  });
  dropZoneElement.addEventListener("drop", (event) => {
    event.preventDefault();
    dropZoneElement.classList.remove("dragover");
    store.set("uploadedFile", event.dataTransfer.files[0]);
  });

  store.subscribe("uploadedFile", (file) => {
    const hasFileElement = document.querySelector("#has-file");
    const noFileElement = document.querySelector("#no-file");
    if (file) {
      hasFileElement.classList.remove("hidden");
      noFileElement.classList.add("hidden");
      const removeButton = document.querySelector("#remove-file");
      removeButton.addEventListener("click", () => {
        store.set("uploadedFile", null);
      });
      const fileNameElement = document.querySelector("#file-name");
      fileNameElement.innerHTML = file.name;
    } else {
      hasFileElement.classList.add("hidden");
      noFileElement.classList.remove("hidden");
    }
  });
}
