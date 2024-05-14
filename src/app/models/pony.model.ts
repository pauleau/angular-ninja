export class PonyModel {
  id?: number;
  name?: string;
  color?: string;
}

export class PonyWithPositionModel extends PonyModel {
  position: number = 0;
  boosted: boolean = false;
}
