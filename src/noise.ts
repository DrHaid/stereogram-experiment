export class Noise {
  width: number;
  height: number;
  data: Array<Array<number>>;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.data = [];

    for (let y = 0; y < this.height; y++) {
      const row: number[] = [];
      for (let x = 0; x < this.width; x++) {
        row.push(+(Math.random() < 0.5));
      }
      this.data.push(row);
    }
  }
}