import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GET_PLANT_RUL } from '../constants/http-url';
import {Plant} from '../../../../common/tables/Plant';

@Injectable({
    providedIn: 'root',
})
export class HttpRequestManagerService {
    constructor(private http: HttpClient) {}

    getplantes(plant:string): Observable<Plant[]> {
        return this.http.get<Plant[]>(`${GET_PLANT_RUL}${plant}/`);
    }

}
