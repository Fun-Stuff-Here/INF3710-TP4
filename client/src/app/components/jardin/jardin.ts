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

	public ngOnInit(): void {
		this.getJardins();
	}

	public getJardins(): void {
		  this.httpManager.getJardins().subscribe((receivedJardins:Jardin[])=>{
            this.jardins = receivedJardins;
		});
	}

	showInfo(jardin: Jardin) {
		console.log(jardin);
	}
}
