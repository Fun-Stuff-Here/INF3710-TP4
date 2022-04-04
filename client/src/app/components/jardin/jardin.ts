import { Component, OnInit } from "@angular/core";
import { Jardin } from "../../../../../common/tables/Jardin";
import { CommunicationService } from "../../communication.service";

@Component({
  selector: "app-jardin",
  templateUrl: "./jardin.html",
  styleUrls: ["./jardin.css"],
})
export class JardinComponent implements OnInit {
	public jardins: Jardin[] = [];

	public constructor(private communicationService: CommunicationService) {}

	public ngOnInit(): void {
		this.getJardins();
	}

	public getJardins(): void {
		this.communicationService.getJardins().subscribe((jardins: Jardin[]) => {
			this.jardins = jardins;
			let example1: Jardin = {
				name: "JardinPotager",
				id: "1",
				area: 5000.000,
				potager: true,
				typeSol: "argileux",
				verger: false,
				maxHeight: 10.000,
				ornement: false,
			};
			let example2: Jardin = {
				name: "Jardin2",
				id: "2",
				area: 5000.000,
				potager: true,
				typeSol: "argileux",
				verger: false,
				maxHeight: 10.000,
				ornement: false,
			};
			this.jardins = [example1, example2];
		  });
	}

	showInfo(jardin: Jardin) {
		console.log(jardin);
	}
}
