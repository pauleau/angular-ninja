import {Injectable} from '@angular/core';
import {LiveRaceModel, RaceModel} from '../models/race.model';
import {delay, interval, map, Observable, of, pipe, take, takeWhile} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../environments/environment";
import {PonyWithPositionModel} from "../models/pony.model";
import {WsService} from "./ws.service";

@Injectable({
  providedIn: 'root'
})
export class RaceService {
  constructor(
    private http: HttpClient,
    private wsService: WsService
  ) {
  }



  list(status: 'PENDING' | 'RUNNING' | 'FINISHED'): Observable<Array<RaceModel>> {
    const params = {status: status};
    return this.http.get<Array<RaceModel>>(`${environment.baseUrl}/api/races`, {params});
  }

  bet(raceId?: number, ponyId?: number) {
    return this.http.post<RaceModel>(`${environment.baseUrl}/api/races/${raceId}/bets`, {'ponyId': ponyId});
  }

  get(id: number) {
    return this.http.get<RaceModel>(`${environment.baseUrl}/api/races/${id}`);
  }

  cancelBet(raceId?: number): Observable<Object> {
    return this.http.delete(`${environment.baseUrl}/api/races/${raceId}/bets`);
  }

  live(raceId?: number): Observable<Array<PonyWithPositionModel>> {
    return this.wsService
      .connect<LiveRaceModel>(`/race/${raceId}`)
      .pipe(
        takeWhile(liveRace => liveRace.status !== 'FINISHED'),
        map(liveRace => liveRace.ponies)
      );
  }

  boost(raceId: number | undefined, ponyId: number) {
    return this.http.post(`${environment.baseUrl}/api/races/${raceId}/boosts`, {'ponyId': ponyId});
  }
}
