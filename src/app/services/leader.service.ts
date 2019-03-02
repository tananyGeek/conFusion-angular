import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
// import { LEADERS } from '../shared/leaders';

// using RxJs
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
// http week 4
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {
  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService ) { }
  // get all leaders
  getLeaders(): Observable<Leader[]> {
    return this.http.get<Leader[]>(baseURL + 'leaders')
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  // get a specific leader
  getSpecificLeader(id: string): Observable<Leader> {
    return this.http.get<Leader>(baseURL + 'leaders/' + id)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  // get a featured leader
  getFeaturedLeader(): Observable<Leader> {
    return this.http.get<Leader[]>(baseURL + 'leaders?featured=true').pipe(map(leaders => leaders[0]))
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
