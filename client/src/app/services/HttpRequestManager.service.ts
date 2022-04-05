import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GET_PLANT_RUL, GET_JARDIN_RUL } from '../constants/http-url';
import {Plant} from '../../../../common/tables/Plant';
import {Jardin} from '../../../../common/tables/Jardin';

@Injectable({
    providedIn: 'root',
})
export class HttpRequestManagerService {
    constructor(private http: HttpClient) {}

    getplantes(plant:string): Observable<Plant[]> {
        return this.http.get<Plant[]>(`${GET_PLANT_RUL}${plant}/`);
    }
	getJardins(): Observable<Jardin[]> {
        return this.http.get<Jardin[]>(`${GET_JARDIN_RUL}`);
    }
}
