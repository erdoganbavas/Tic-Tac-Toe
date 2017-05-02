export class Cell {
  value = '-';
  valueSign = '<i>-</i>';

  constructor(private x: number, private y: number) {

  }

  setValue(value: string) {
    if (this.value === '-') {
      this.value = value;
      this.valueSign = '<i>' + value + '</i>';
      return true;
    }else {
      return false;
    }
  }

  isEmpty() {
    return this.value === '-';
  }

  resetValue() {
    this.value = '-';
    this.valueSign = '<i>' + this.value + '</i>';
  }
}
