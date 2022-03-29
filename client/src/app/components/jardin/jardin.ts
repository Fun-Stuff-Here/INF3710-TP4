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
		  });
	}
}
