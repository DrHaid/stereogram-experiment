import { HeightMap } from "./heightMap";
import { Noise } from "./noise";

export class Stereogram {
  baseNoise: Noise;
  heightMap: HeightMap;
  depth: number;
  width: number;
  height: number;
  data: Array<Array<number>>;

  constructor(noise: Noise, heightMap: HeightMap) {
    this.baseNoise = noise;
    this.heightMap = heightMap;
    this.check_noise_height_dimensions();
    this.width = noise.width * 2;
    this.height = noise.height;
    this.depth = 20;
    this.data = [];
    this.#generate();
  }

  check_noise_height_dimensions() {
    if (this.baseNoise.width != this.heightMap.width || 
      this.baseNoise.height != this.heightMap.height) {
        throw Error("height map and noise don't have the same dimensions")
    }
  }

  #generate() {
    this.data = this.baseNoise.data;

    for (let y = 0; y < this.height; y++) {
      this.data[y].push(...this.baseNoise.data[y])
    }

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width / 2; x++) {
        const heightValue = this.heightMap.data[y][x];
        const noiseValue = this.baseNoise.data[y][x];
        const shift = Math.round(heightValue * this.depth);
        const shiftedX = Math.min(Math.max(0, x - shift), this.baseNoise.width);
        this.data[y][shiftedX] = noiseValue;
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, this.width, this.height);
    var imageData = ctx.getImageData(0, 0, this.width, this.height);
    var pixels = imageData.data;

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const offset = (y * this.width + x) * 4;
        const value = this.data[y][x];
        pixels[offset] = value * 255;
        pixels[offset + 1] = value * 255;
        pixels[offset + 2] = value * 255;
        pixels[offset + 3] = 255;
      }
    }
    ctx.putImageData(imageData, 0, 0);
  }
}