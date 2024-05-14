import {PonyModel, PonyWithPositionModel} from './pony.model';

export class RaceModel {
  id?: number;
  name?: string;
  ponies?: Array<PonyModel>;
  startInstant: string = '2020-02-18T08:02:00Z';
  betPonyId?: number;
  status?: 'PENDING' | 'RUNNING' | 'FINISHED';
}

export class LiveRaceModel {
  ponies: Array<PonyWithPositionModel> = [];
  status?: 'PENDING' | 'RUNNING' | 'FINISHED';
}
