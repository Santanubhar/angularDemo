import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';

import 'rxjs/Rx';

@Injectable()
export class HttpService {

  constructor(private http: Http) { }

  getReports(){
    return this.http.get('http://localhost:8080/reports.json')
      .map((data: Response) => data.json());
  }

}
