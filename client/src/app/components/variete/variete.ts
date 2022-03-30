import { Component, OnInit } from "@angular/core";
import { CommunicationService } from "src/app/communication.service";
import { Variete } from "../../../../../common/tables/Variete";
// import { CommunicationService } from "../../communication.service";

@Component({
  selector: "app-variete",
  templateUrl: "./variete.html",
  styleUrls: ["./variete.css"],
})
export class VarieteComponent implements OnInit {
	public varietes: Variete[] = [];

	
	public constructor(private communicationService: CommunicationService) {}

	public ngOnInit(): void {
        this.getVarietes();
	}

    private getVarietes(): void {
        this.communicationService.getVarietes().subscribe((varietes: Variete[]) => {
            this.varietes = varietes;
        });
    }

    public deleteVariete(id: number): void {
        this.communicationService.deleteVariete(id);
    }
}
