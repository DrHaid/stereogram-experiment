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

const initCanvas = () => {
  const sCanvas = document.getElementById("stereogram") as HTMLCanvasElement;
  stereoCanvas = new CanvasData(sCanvas);

  const hCanvas = document.getElementById("height") as HTMLCanvasElement;
  heightCanvas = new CanvasData(hCanvas);
}

const loadHeightMap = () => {
  heightCanvas.drawImage(ringHeightMap)
    .then(() => {
      heightMap = new HeightMap(heightCanvas)
    }
  );
};

const initInputs = () => {
  const button = document.getElementById("generate") as HTMLButtonElement;
  button.onclick = handleGenerate;
}

const handleGenerate = () => {
  const noise = new Noise(stereoCanvas.width / 2, stereoCanvas.height);
  stereogram = new Stereogram(noise, heightMap);
  if (stereoCanvas.ctx){
    stereogram.draw(stereoCanvas.ctx);
  }
}

initInputs();
initCanvas();
loadHeightMap();

