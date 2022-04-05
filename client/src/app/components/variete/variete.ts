import { Component, OnInit } from "@angular/core";
// import { CommunicationService } from "src/app/communication.service";
import { Variete } from "../../../../../common/tables/Variete";
// import { CommunicationService } from "../../communication.service";
import { Router } from '@angular/router';
import { HttpRequestManagerService } from "src/app/services/HttpRequestManager.service";

@Component({
  selector: "app-varietes",
  templateUrl: "./variete.html",
  styleUrls: ["./variete.css"],
})
export class VarieteComponent implements OnInit {
	public varietes: Variete[];
        // {  
        //     id: 1,
        //     name: 'Tuberosum',
        //     yearMarket: 1980,
        //     plantingDescription: 'Légume tige',
        //     maintenanceDescription: 'Arroser à chaque jour',
        //     seedingDescription: 'culture vivrière',
        //     harvestDescription: 'À complète maturité, lorsque le feuillage commence à se faner',
        //     plantingPeriod: 'Année longue',
        //     harvestPeriod: 'Année longue',
        //     comment: 'Est une patate',
        //     goodSoils: 'Sol léger et légèrement acide',
        // }];
	
	public constructor(private readonly httpManager: HttpRequestManagerService, private router: Router) {}

	public ngOnInit(): void {
        this.httpManager.getVarietes().subscribe((varietesReceived: Variete[]) => {
            this.varietes = varietesReceived;
            console.log(this.varietes);
        });
	}

    // private getVarietes(): void {
    //     this.httpManager.getVarietes().subscribe((varietesReceived: Variete[]) => {
    //         this.varietes = varietesReceived;
    //     });
    //     console.log(this.varietes[0]);
    // }

    public deleteVariete(id: number): void {
        console.log(this.varietes);
        this.httpManager.deleteVariete(id);
    }

    public goToModify(id: number): void {
        this.router.navigate(['/varietes/' + id]);
    }
}
