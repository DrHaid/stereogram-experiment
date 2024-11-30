import { CanvasData } from "./canvasData";

export class HeightMap {
  width: number;
  height: number;
  data: Array<Array<number>>;

  constructor(data: CanvasData) {
    this.width = data.width;
    this.height = data.height;
    this.data = [];

    if (!data.ctx) return;
    const imageData = data.ctx.getImageData(0, 0, this.width, this.height);
    const pixels = imageData.data;
    for (let y = 0; y < this.height; y++) {
      const row: number[] = [];
      for (let x = 0; x < this.width; x++) {
        const offset = (y * this.width + x) * 4;
        const r = pixels[offset];
        const g = pixels[offset + 1];
        const b = pixels[offset + 2];
        const value = ((r + g + b) / 3) / 255;
        row.push(value);
      }
      this.data.push(row);
    }
  }
}