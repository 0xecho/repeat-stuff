import { store } from "./store.js";
import { JSONParser } from "@streamparser/json";

export function setupAnalyze(button) {
  button.addEventListener("click", () => {
    const uploadedFile = store.get("uploadedFile");
    if (!uploadedFile) {
      alert("Please upload a file first");
      return;
    }

    const reader = new FileReader();
    const file = uploadedFile;
    reader.readAsText(file);
    reader.onload = function () {
      const parser = new JSONParser({
        paths: ["$[*]"],
      });
      parser.onValue = (value) => {
        store.set(
          "YTData",
          value?.value.filter(
            (item) => item && item.products && item.products.includes("YouTube")
          ) || []
        );
      };
      parser.write(reader.result);
    };
  });
}
