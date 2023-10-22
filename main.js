import { setupCharts } from "./charts.js";
import { setupAnalyze } from "./analyze.js";
import { setupDropzone } from "./dropzone.js";
import { setupUploadFile } from "./uploadFile.js";

setupCharts(document.querySelector("#counter"));
setupAnalyze(document.querySelector("#analyze"));
setupDropzone(document.querySelector("#dropzone"));
setupUploadFile(document.querySelector("#file-upload"));
