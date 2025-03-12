import { Noise } from "./noise";
import "./style.css"
import { CanvasData } from "./canvasData";
import { HeightMap } from "./heightMap";
import { Stereogram } from "./stereogram";

import ringHeightMap from "./img/ring_heightmap.png"
import catHeightMap from "./img/cat_heightmap.png"
import coneHeightMap from "./img/cone_heightmap.png"
import spiralHeightMap from "./img/spiral_heightmap.png"
import noiseHeightMap from "./img/cellnoise_heightmap.png"

const HEIGHT_MAPS = [
  {name: "Ring", src: ringHeightMap},
  {name: "Spiral", src: spiralHeightMap},
  {name: "Cone", src: coneHeightMap},
  {name: "Cat", src: catHeightMap},
  {name: "Noise", src: noiseHeightMap}
]

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
      generateStereogram();
    }
  ).catch((error) => {
    const container = document.getElementById("heightMapContainer") as HTMLCanvasElement;
    addAlertBanner(container, error);
  });
};

const initInputs = () => {
  const button = document.getElementById("generate") as HTMLButtonElement;
  button.onclick = generateStereogram;

  const select = document.getElementById("heightSelect") as HTMLSelectElement;
  select.onchange = handleSelectChange;
  HEIGHT_MAPS.forEach(map => {
    const option = document.createElement('option');
    option.value = map.src;
    option.textContent = map.name;
    select.appendChild(option);
  });
  select.value = ringHeightMap; // set default heightMap

  const input = document.getElementById("heightInput") as HTMLInputElement;
  input.onchange = handleInputChange;
};

const generateStereogram = () => {
  const noise = new Noise(stereoCanvas.width / 2, stereoCanvas.height);
  stereogram = new Stereogram(noise, heightMap);
  if (stereoCanvas.ctx){
    stereogram.draw(stereoCanvas.ctx);
  }
};

const handleSelectChange = (input: Event) => {
  const target = input.target as HTMLSelectElement;
  loadHeightMap(target.value);
};

const handleInputChange = (input: Event) => {
  const target = input.target as HTMLInputElement;
  if (!target.files) return;

  const url = window.URL || window.webkitURL;
  const src = url.createObjectURL(target.files[0]);
  loadHeightMap(src);

  // add selected file to dropdown
  const select = document.getElementById("heightSelect") as HTMLSelectElement;
  const option = document.createElement('option');
  option.value = src;
  option.textContent = target.files[0].name;
  select.appendChild(option);
  select.value = src;
};

initInputs();
initCanvas();
loadHeightMap();