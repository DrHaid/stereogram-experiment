export class CanvasData {
  canvas: HTMLCanvasElement;
  ctx?: CanvasRenderingContext2D;
  width: number;
  height: number;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    const context = this.canvas.getContext("2d");
    if (context)
      this.ctx = context;
  }

  drawImage(src: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const heightMap = new Image();
      heightMap.src = src;
      heightMap.onload = () => {
        if (heightMap.width != this.width 
          || heightMap.height != this.height) {
            reject(`Wrong image dimensions! Should be ${this.width}x${this.height}.`);
            return;
        }
        
        this.ctx?.drawImage(heightMap,0,0);
        resolve();
      };
    })
  }
}