import { Noise } from "./noise";
import "./style.css"
import ringHeightMap from "./img/ring_heightmap.png"
import { CanvasData } from "./canvasData";
import { HeightMap } from "./heightMap";
import { Stereogram } from "./stereogram";

var stereoCanvas: CanvasData;
var heightCanvas: CanvasData;
var heightMap: HeightMap;
var stereogram: Stereogram;

const addAlertBanner = (targetParent: HTMLElement, message: string) => {
  const container = document.createElement("div");
  container.className = "alert";
  const text = document.createElement("span");
  text.textContent = message;
  const closeButton = document.createElement("span");
  closeButton.className = "closeButton";
  closeButton.textContent = "✕";
  closeButton.onclick = (e) => { (e.target as HTMLElement).parentElement?.remove(); };
  container.appendChild(text);
  container.appendChild(closeButton);
  targetParent.appendChild(container);
};

const initCanvas = () => {
  const sCanvas = document.getElementById("stereogram") as HTMLCanvasElement;
  stereoCanvas = new CanvasData(sCanvas);

  const hCanvas = document.getElementById("height") as HTMLCanvasElement;
  heightCanvas = new CanvasData(hCanvas);
};

const loadHeightMap = (src?: string) => {
  const sourceURL = src ?? ringHeightMap;
  heightCanvas.drawImage(sourceURL)
    .then(() => {
      heightMap = new HeightMap(heightCanvas)
    }
  ).catch((error) => {
    const container = document.getElementById("heightMapContainer") as HTMLCanvasElement;
    addAlertBanner(container, error);
  });
};

const initInputs = () => {
  const button = document.getElementById("generate") as HTMLButtonElement;
  button.onclick = handleGenerate;

  const input = document.getElementById("heightInput") as HTMLInputElement;
  input.onchange = handleInputChange;
};

const handleGenerate = () => {
  const noise = new Noise(stereoCanvas.width / 2, stereoCanvas.height);
  stereogram = new Stereogram(noise, heightMap);
  if (stereoCanvas.ctx){
    stereogram.draw(stereoCanvas.ctx);
  }
};

const handleInputChange = (input: Event) => {
  const target = input.target as HTMLInputElement;
  if (!target.files) return;

  const url = window.URL || window.webkitURL;
  const src = url.createObjectURL(target.files[0]);
  loadHeightMap(src);
};

initInputs();
initCanvas();
loadHeightMap();

