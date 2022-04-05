import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GET_PLANT_RUL, GET_JARDIN_RUL, GET_PARCELLE_RUL, GET_RANG_RUL } from '../constants/http-url';
import {Plant} from '../../../../common/tables/Plant';
import {Jardin} from '../../../../common/tables/Jardin';
import {Parcelle} from '../../../../common/tables/Parcelle';
import {Rang} from '../../../../common/tables/Rang';

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
	getParcelles(jardinID:string): Observable<Parcelle[]> {
        return this.http.get<Parcelle[]>(`${GET_PARCELLE_RUL}${jardinID}`);
    }
	getRangs(jardinID:string, xparcelle:number, yparcelle:number): Observable<Rang[]> {
        return this.http.get<Rang[]>(`${GET_RANG_RUL}`);
    }
}
