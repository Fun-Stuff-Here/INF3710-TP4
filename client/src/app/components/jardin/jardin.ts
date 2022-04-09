import { Component, OnInit } from "@angular/core";
import { Jardin } from "../../../../../common/tables/Jardin";
import { HttpRequestManagerService } from "src/app/services/HttpRequestManager.service";

@Component({
  selector: "app-jardin",
  templateUrl: "./jardin.html",
  styleUrls: ["./jardin.css"],
})
export class JardinComponent implements OnInit {
	public jardins: Jardin[] = [];

	constructor(private readonly httpManager:HttpRequestManagerService){}

	ngOnInit(): void {
		this.getJardins();
	}

	private getJardins(): void {
		  this.httpManager.getJardins().subscribe((receivedJardins:Jardin[])=>{
            this.jardins = receivedJardins;
		});
	}
}
