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
    return new Promise<void>((resolve) => {
      const heightMap = new Image();
      heightMap.src = src;
      heightMap.onload = () => {
        this.ctx?.drawImage(heightMap,0,0);
        resolve();
      };
    })
  }
}