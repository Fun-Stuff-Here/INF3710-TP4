import { Component, OnInit } from "@angular/core";
import { Jardin } from "../../../../../common/tables/Jardin";
import { Rang } from "../../../../../common/tables/Rang";
import { HttpRequestManagerService } from "src/app/services/HttpRequestManager.service";

@Component({
  selector: "app-jardin",
  templateUrl: "./jardin.html",
  styleUrls: ["./jardin.css"],
})
export class JardinComponent implements OnInit {
	public jardins: Jardin[] = [];
	public rang: Rang[] = [];

	constructor(private readonly httpManager:HttpRequestManagerService){}

	ngOnInit(): void {
		this.getJardins();
	}

	private getJardins(): void {
		  this.httpManager.getJardins().subscribe((receivedJardins:Jardin[])=>{
            this.jardins = receivedJardins;
		});
	}

	/*
	private getRangs(jardinID:string, xparcelle:number, yparcelle:number): void {
		this.httpManager.getRangs(jardinID, xparcelle, yparcelle).subscribe((receivedRangs:Rang[])=>{
		  this.rang = receivedRangs;
	  });
  	} */
}
