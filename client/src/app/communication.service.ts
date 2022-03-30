import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
// tslint:disable-next-line:ordered-imports
import { of, Observable, Subject } from "rxjs";
import { catchError } from "rxjs/operators";
import { Jardin } from "../../../common/tables/Jardin";
import { Variete } from "../../../common/tables/Variete";

@Injectable()
export class CommunicationService {
	private readonly BASE_URL: string = "http://localhost:3000/database";
	public constructor(private http: HttpClient) {}

	private _listners: any = new Subject<any>();

	public listen(): Observable<any> {
		return this._listners.asObservable();
	}

	public filter(filterBy: string): void {
		this._listners.next(filterBy);
	}

	public getJardins(): Observable<Jardin[]> {
		return this.http.get<Jardin[]>(this.BASE_URL + "/jardins").pipe(catchError(this.handleError<Jardin[]>("getJardins")));
	}

	public getVarietes(): Observable<Variete[]> {
		return this.http.get<Variete[]>(this.BASE_URL + "/varietes").pipe(catchError(this.handleError<Variete[]>("getVarietes")));
	}

	public deleteVariete(id: number): void {
		this.http.delete(this.BASE_URL + "/varietes/" + id);
	}

	private handleError<T>(request: string, result?: T): (error: Error) => Observable<T> {
		return (error: Error): Observable<T> => {return of(result as T);};
	}
}
