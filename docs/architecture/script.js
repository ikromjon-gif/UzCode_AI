/* Kuzatuv AI — direct Hugging Face Gradio API client. No detections are created client-side. */

// Set this to your Space URL, for example: https://your-name-your-space.hf.space
const API_URL = "";

// Change only if your app.py exposes a different Gradio api_name.
const API_NAME = "/predict";

const translations = {
  en: { detectionReady:"Detection ready", heroEyebrow:"COMPUTER VISION, REFINED", heroTitle:"See what matters.<br><em>Instantly.</em>", heroCopy:"AI powered object detection for every frame. Upload an image or use your camera to understand the world in real time.", uploadImage:"Upload Image", openCamera:"Open Camera", cameraOpen:"Camera Open", liveAnalysis:"LIVE ANALYSIS", imagePreview:"Image Preview", emptyTitle:"Your image will appear here", emptyCopy:"Choose an image or open your camera to begin.", analyzing:"Analyzing image", runningInference:"Running YOLO26 inference…", atAGlance:"AT A GLANCE", detectionStatistics:"Detection Statistics", currentPeople:"Current People", detectedInImage:"Detected in this image", totalObjects:"Total Objects", allDetectedObjects:"All detected objects", averageConfidence:"Average Confidence", detectionConfidence:"Detection confidence", model:"Model", objectDetection:"Object detection", inferenceTime:"Inference Time", apiRoundTrip:"API round trip", recognizedObjects:"RECOGNIZED OBJECTS", detectionResults:"Detection Results", awaitingImage:"Awaiting image", object:"Object", confidence:"Confidence", boundingBox:"Bounding Box", awaitingResults:"Run an image through the model to view verified detection results.", developer:"Developer", noObjects:"No objects were detected by the model in this image.", verifiedResults:"verified result", noApiUrl:"Set API_URL in script.js to your Hugging Face Space URL before detecting images.", cameraUnsupported:"Camera access is not supported in this browser.", cameraError:"Unable to access camera", invalidImage:"This file is not a valid image.", genericError:"The image could not be analyzed. Please try again." },
  uz: { detectionReady:"Aniqlashga tayyor", heroEyebrow:"TAKOMILLASHGAN KOMPYUTER KO'RISHI", heroTitle:"Muhim narsani ko'ring.<br><em>Darhol.</em>", heroCopy:"Har bir tasvir uchun sun'iy intellektga asoslangan obyekt aniqlash. Tasvir yuklang yoki dunyoni real vaqtda tushunish uchun kamerangizdan foydalaning.", uploadImage:"Rasm yuklash", openCamera:"Kamerani ochish", cameraOpen:"Kamera ochiq", liveAnalysis:"JONLI TAHLIL", imagePreview:"Rasm ko'rinishi", emptyTitle:"Rasmingiz shu yerda ko'rinadi", emptyCopy:"Boshlash uchun rasm tanlang yoki kamerani oching.", analyzing:"Rasm tahlil qilinmoqda", runningInference:"YOLO26 tahlili ishlamoqda…", atAGlance:"QISQACHA", detectionStatistics:"Aniqlash statistikasi", currentPeople:"Joriy odamlar", detectedInImage:"Ushbu rasmda aniqlandi", totalObjects:"Jami obyektlar", allDetectedObjects:"Barcha aniqlangan obyektlar", averageConfidence:"O'rtacha ishonchlilik", detectionConfidence:"Aniqlash ishonchliligi", model:"Model", objectDetection:"Obyekt aniqlash", inferenceTime:"Tahlil vaqti", apiRoundTrip:"API javob vaqti", recognizedObjects:"ANIQLANGAN OBYEKTLAR", detectionResults:"Aniqlash natijalari", awaitingImage:"Rasm kutilmoqda", object:"Obyekt", confidence:"Ishonchlilik", boundingBox:"Chegara qutisi", awaitingResults:"Tasdiqlangan aniqlash natijalarini ko'rish uchun rasmni modelga yuboring.", developer:"Dasturchi", noObjects:"Model ushbu rasmda obyektlarni aniqlamadi.", verifiedResults:"tasdiqlangan natija", noApiUrl:"Rasmni aniqlashdan oldin script.js faylida API_URL qiymatini Hugging Face Space manzilingizga o'rnating.", cameraUnsupported:"Ushbu brauzerda kameradan foydalanish qo'llab-quvvatlanmaydi.", cameraError:"Kameraga kirib bo'lmadi", invalidImage:"Bu fayl yaroqli rasm emas.", genericError:"Rasmni tahlil qilib bo'lmadi. Qayta urinib ko'ring." },
  ko: { detectionReady:"감지 준비 완료", heroEyebrow:"정교한 컴퓨터 비전", heroTitle:"중요한 것을 봅니다.<br><em>즉시.</em>", heroCopy:"모든 프레임을 위한 AI 기반 객체 감지입니다. 이미지를 업로드하거나 카메라로 세상을 실시간 분석하세요.", uploadImage:"이미지 업로드", openCamera:"카메라 열기", cameraOpen:"카메라 켜짐", liveAnalysis:"실시간 분석", imagePreview:"이미지 미리보기", emptyTitle:"이미지가 여기에 표시됩니다", emptyCopy:"시작하려면 이미지를 선택하거나 카메라를 여세요.", analyzing:"이미지 분석 중", runningInference:"YOLO26 추론 실행 중…", atAGlance:"한눈에 보기", detectionStatistics:"감지 통계", currentPeople:"현재 사람 수", detectedInImage:"이 이미지에서 감지됨", totalObjects:"전체 객체", allDetectedObjects:"감지된 모든 객체", averageConfidence:"평균 신뢰도", detectionConfidence:"감지 신뢰도", model:"모델", objectDetection:"객체 감지", inferenceTime:"추론 시간", apiRoundTrip:"API 왕복 시간", recognizedObjects:"인식된 객체", detectionResults:"감지 결과", awaitingImage:"이미지 대기 중", object:"객체", confidence:"신뢰도", boundingBox:"경계 상자", awaitingResults:"검증된 감지 결과를 보려면 모델에 이미지를 실행하세요.", developer:"개발자", noObjects:"모델이 이 이미지에서 객체를 감지하지 못했습니다.", verifiedResults:"검증된 결과", noApiUrl:"이미지 감지 전에 script.js의 API_URL에 Hugging Face Space URL을 설정하세요.", cameraUnsupported:"이 브라우저에서는 카메라 접근을 지원하지 않습니다.", cameraError:"카메라에 접근할 수 없습니다", invalidImage:"유효한 이미지 파일이 아닙니다.", genericError:"이미지를 분석할 수 없습니다. 다시 시도하세요." },
};
let currentLanguage = localStorage.getItem("kuzatuv-language") || "en";
const t = (key) => translations[currentLanguage][key] || translations.en[key] || key;

function applyLanguage(language) {
  currentLanguage = translations[language] ? language : "en";
  localStorage.setItem("kuzatuv-language", currentLanguage);
  document.documentElement.lang = currentLanguage;
  document.querySelectorAll("[data-i18n]").forEach((node) => { node.textContent = t(node.dataset.i18n); });
  document.querySelectorAll("[data-i18n-html]").forEach((node) => { node.innerHTML = t(node.dataset.i18nHtml); });
  document.querySelectorAll("[data-language]").forEach((button) => button.classList.toggle("active", button.dataset.language === currentLanguage));
  if (!cameraStream) elements.cameraButton.innerHTML = `<span>${t("openCamera")}</span> <b>◉</b>`;
  if (!latestDetections.length) clearResults();
  else {
    elements.resultCount.textContent = `${latestDetections.length} ${t("verifiedResults")}${latestDetections.length === 1 || currentLanguage !== "en" ? "" : "s"}`;
    elements.results.replaceChildren(...latestDetections.map(resultRow));
  }
}

const elements = {
  uploadButton: document.getElementById("uploadButton"), imageInput: document.getElementById("imageInput"),
  cameraButton: document.getElementById("cameraButton"), captureButton: document.getElementById("captureButton"),
  closeCameraButton: document.getElementById("closeCameraButton"), cameraPreview: document.getElementById("cameraPreview"),
  imagePreview: document.getElementById("imagePreview"), canvas: document.getElementById("detectionCanvas"),
  emptyState: document.getElementById("emptyState"), loading: document.getElementById("loadingOverlay"),
  error: document.getElementById("errorMessage"), people: document.getElementById("peopleCount"),
  objects: document.getElementById("objectCount"), confidence: document.getElementById("confidenceValue"), time: document.getElementById("inferenceTime"),
  results: document.getElementById("resultsBody"), resultCount: document.getElementById("resultCount"),
};

let cameraStream = null;
let activeImage = null;
let latestDetections = [];

document.querySelectorAll("[data-language]").forEach((button) => button.addEventListener("click", () => applyLanguage(button.dataset.language)));
applyLanguage(currentLanguage);

elements.uploadButton.addEventListener("click", () => elements.imageInput.click());
elements.imageInput.addEventListener("change", (event) => {
  const [file] = event.target.files;
  if (file) processImage(file);
  event.target.value = "";
});
elements.cameraButton.addEventListener("click", openCamera);
elements.captureButton.addEventListener("click", captureCameraFrame);
elements.closeCameraButton.addEventListener("click", closeCamera);
window.addEventListener("beforeunload", closeCamera);

function apiRoot() {
  const base = API_URL.trim().replace(/\/$/, "");
  if (!base) throw new Error(t("noApiUrl"));
  return base.endsWith("/gradio_api") ? base : `${base}/gradio_api`;
}

function setLoading(isLoading) { elements.loading.hidden = !isLoading; }
function setError(message = "") { elements.error.hidden = !message; elements.error.textContent = message; }

async function openCamera() {
  setError();
  if (!navigator.mediaDevices?.getUserMedia) return setError(t("cameraUnsupported"));
  try {
    closeCamera();
    cameraStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" }, audio: false });
    elements.cameraPreview.srcObject = cameraStream;
    elements.cameraPreview.hidden = false;
    elements.imagePreview.hidden = true;
    elements.canvas.hidden = true;
    elements.emptyState.hidden = true;
    elements.captureButton.disabled = false;
    elements.closeCameraButton.disabled = false;
    elements.cameraButton.textContent = t("cameraOpen");
  } catch (error) { setError(`${t("cameraError")}: ${error.message}`); }
}

function closeCamera() {
  cameraStream?.getTracks().forEach((track) => track.stop());
  cameraStream = null;
  elements.cameraPreview.srcObject = null;
  elements.cameraPreview.hidden = true;
  elements.captureButton.disabled = true;
  elements.closeCameraButton.disabled = true;
  elements.cameraButton.innerHTML = `<span>${t("openCamera")}</span> <b>◉</b>`;
}

function captureCameraFrame() {
  if (!cameraStream || !elements.cameraPreview.videoWidth) return;
  const frame = document.createElement("canvas");
  frame.width = elements.cameraPreview.videoWidth;
  frame.height = elements.cameraPreview.videoHeight;
  frame.getContext("2d").drawImage(elements.cameraPreview, 0, 0);
  frame.toBlob((blob) => blob && processImage(new File([blob], "camera-capture.jpg", { type: "image/jpeg" })), "image/jpeg", 0.94);
}

async function processImage(file) {
  setError(); closeCamera(); setLoading(true);
  try {
    activeImage = await loadImage(file);
    showImage(activeImage);
    const startedAt = performance.now();
    const response = await sendToGradio(file);
    const elapsed = performance.now() - startedAt;
    const payload = await response;
    const detections = extractDetections(payload);
    renderResults(detections, elapsed, payload);
  } catch (error) {
    clearResults();
    setError(error.message || t("genericError"));
  } finally { setLoading(false); }
}

function loadImage(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file); const image = new Image();
    image.onload = () => { URL.revokeObjectURL(url); resolve(image); };
    image.onerror = () => { URL.revokeObjectURL(url); reject(new Error(t("invalidImage"))); };
    image.src = url;
  });
}

function showImage(image) {
  elements.imagePreview.src = image.src;
  elements.imagePreview.hidden = false;
  elements.emptyState.hidden = true;
  elements.canvas.hidden = false;
  requestAnimationFrame(() => fitCanvas(image));
}

function fitCanvas(image) {
  const rect = elements.imagePreview.getBoundingClientRect();
  elements.canvas.width = Math.round(rect.width); elements.canvas.height = Math.round(rect.height);
  elements.canvas.style.width = `${rect.width}px`; elements.canvas.style.height = `${rect.height}px`;
  elements.canvas.dataset.scaleX = String(rect.width / image.naturalWidth);
  elements.canvas.dataset.scaleY = String(rect.height / image.naturalHeight);
}

/* Gradio's documented upload → call flow. The response is an SSE stream, not fake local data. */
async function sendToGradio(file) {
  const root = apiRoot();
  const upload = new FormData(); upload.append("files", file, file.name);
  const uploadResponse = await fetch(`${root}/upload`, { method: "POST", body: upload });
  if (!uploadResponse.ok) throw new Error(`Image upload failed (${uploadResponse.status}). Check your Space URL and CORS settings.`);
  const uploaded = await uploadResponse.json();
  const uploadedPath = Array.isArray(uploaded) ? uploaded[0] : uploaded;
  const callResponse = await fetch(`${root}/call${API_NAME}`, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ data: [{ path: uploadedPath }] }),
  });
  if (!callResponse.ok) throw new Error(`Inference request failed (${callResponse.status}). Verify API_NAME in script.js.`);
  return readGradioStream(callResponse);
}

async function readGradioStream(response) {
  const text = await response.text();
  const match = [...text.matchAll(/event:\s*complete\s*\ndata:\s*(.+)/g)].pop();
  if (!match) throw new Error("The Gradio API returned no completed inference result.");
  return JSON.parse(match[1]);
}

/* Supports common Gradio JSON output shapes, but only displays detections actually returned by the model. */
function extractDetections(response) {
  const data = response?.data ?? response;
  const candidates = findDetectionList(data);
  if (!candidates) throw new Error("No detection data was found in the API response. Adapt extractDetections() to match your app.py output.");
  return candidates.map(normalizeDetection).filter(Boolean);
}

function findDetectionList(value) {
  if (Array.isArray(value)) {
    if (value.some((item) => item && typeof item === "object" && ("label" in item || "class" in item || "class_name" in item))) return value;
    for (const item of value) { const found = findDetectionList(item); if (found) return found; }
  }
  if (value && typeof value === "object") {
    for (const key of ["detections", "results", "boxes", "predictions"]) if (Array.isArray(value[key])) return value[key];
    for (const item of Object.values(value)) { const found = findDetectionList(item); if (found) return found; }
  }
  return null;
}

function normalizeDetection(item) {
  const label = item.label ?? item.class_name ?? item.class ?? item.name;
  const confidence = Number(item.confidence ?? item.score ?? item.conf ?? item.probability);
  const box = item.box ?? item.bbox ?? item.bounding_box ?? item;
  const x = Number(box.x ?? box.xmin ?? box.left ?? box[0]); const y = Number(box.y ?? box.ymin ?? box.top ?? box[1]);
  const width = Number(box.width ?? (box.xmax != null ? box.xmax - x : box[2])); const height = Number(box.height ?? (box.ymax != null ? box.ymax - y : box[3]));
  return label && Number.isFinite(confidence) && [x, y, width, height].every(Number.isFinite) ? { label: String(label), confidence, x, y, width, height } : null;
}

function renderResults(detections, elapsed, payload) {
  latestDetections = detections;
  drawBoxes(detections);
  const confidence = detections.length ? detections.reduce((sum, item) => sum + item.confidence, 0) / detections.length : 0;
  elements.people.textContent = detections.filter((item) => item.label.toLowerCase() === "person").length;
  elements.objects.textContent = detections.length;
  elements.confidence.textContent = detections.length ? `${(confidence * (confidence <= 1 ? 100 : 1)).toFixed(1)}%` : "—";
  elements.time.textContent = `${Number(payload?.duration ?? elapsed).toFixed(0)} ms`;
  elements.resultCount.textContent = `${detections.length} ${t("verifiedResults")}${detections.length === 1 || currentLanguage !== "en" ? "" : "s"}`;
  elements.results.replaceChildren(...(detections.length ? detections.map(resultRow) : [emptyRow(t("noObjects"))]));
}

function drawBoxes(detections) {
  if (!activeImage) return; fitCanvas(activeImage);
  const context = elements.canvas.getContext("2d"); const sx = Number(elements.canvas.dataset.scaleX); const sy = Number(elements.canvas.dataset.scaleY);
  context.clearRect(0, 0, elements.canvas.width, elements.canvas.height); context.lineWidth = 2; context.font = "500 12px Inter";
  detections.forEach((item) => { const x = item.x * sx, y = item.y * sy, w = item.width * sx, h = item.height * sy; const label = `${item.label} ${(item.confidence * (item.confidence <= 1 ? 100 : 1)).toFixed(0)}%`;
    context.strokeStyle = "#16a34a"; context.strokeRect(x, y, w, h); const labelWidth = context.measureText(label).width + 14;
    context.fillStyle = "#16a34a"; context.fillRect(x, Math.max(0, y - 25), labelWidth, 23); context.fillStyle = "#ffffff"; context.fillText(label, x + 7, Math.max(15, y - 9));
  });
}

function resultRow(item) { const row = document.createElement("tr"); row.innerHTML = `<td><span class="object-dot"></span>${escapeHtml(item.label)}</td><td>${(item.confidence * (item.confidence <= 1 ? 100 : 1)).toFixed(1)}%</td><td class="bbox">x: ${item.x.toFixed(0)}, y: ${item.y.toFixed(0)}, w: ${item.width.toFixed(0)}, h: ${item.height.toFixed(0)}</td>`; return row; }
function emptyRow(message) { const row = document.createElement("tr"); row.className = "empty-row"; row.innerHTML = `<td colspan="3">${escapeHtml(message)}</td>`; return row; }
function escapeHtml(value) { const node = document.createElement("span"); node.textContent = value; return node.innerHTML; }
function clearResults() { latestDetections = []; elements.people.textContent = elements.objects.textContent = elements.confidence.textContent = elements.time.textContent = "—"; elements.resultCount.textContent = t("awaitingImage"); elements.results.replaceChildren(emptyRow(t("awaitingResults"))); elements.canvas.getContext("2d").clearRect(0, 0, elements.canvas.width, elements.canvas.height); }
window.addEventListener("resize", () => { if (activeImage) drawBoxes(latestDetections); });
