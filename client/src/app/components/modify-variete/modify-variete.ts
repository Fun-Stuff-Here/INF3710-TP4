import { Component, OnInit } from "@angular/core";
import { CommunicationService } from "src/app/communication.service";
import { Variete } from "../../../../../common/tables/Variete";
// import { CommunicationService } from "../../communication.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-modify-variete",
  templateUrl: "./modify-variete.html",
  styleUrls: ["./modify-variete.css"],
})
export class ModifyVarieteComponent implements OnInit {
	public variete: Variete = {
        id: 1,
        name: 'Tuberosum',
        yearMarket: 1980,
        plantingDescription: 'Légume tige',
        maintenanceDescription: 'Arroser à chaque jour',
        seedingDescription: 'culture vivrière',
        harvestDescription: 'À complète maturité, lorsque le feuillage commence à se faner',
        plantingPeriod: 'Année longue',
        harvestPeriod: 'Année longue',
        comment: 'Est une patate',
        goodSoils: 'Sol léger et légèrement acide',
    };
    public id: number;
    public values: any[] = [];

    public attributes: string[] = [
        'Id',
        'Nom',
        'Année de mise en marché',
        'Description de la plantation',
        "Description de l'entretien",
        'Description du semis',
        'Description de la récolte',
        'Période de mise en place',
        'Période de récolte',
        'Commentaire',
        'Bons types de sol',
    ];

	
	public constructor(private communicationService: CommunicationService, private route: ActivatedRoute) {}

	public ngOnInit(): void {
        this.id = +(this.route.snapshot.paramMap.get('id') as string);

        for (const value of Object.values(this.variete)) {
            this.values.push(value);
        }
        // this.getVariete();
	}

    /* private getVariete(): void {
        this.communicationService.getVariete(this.id).subscribe((variete: Variete) => {
            this.variete = variete;
        });
    }*/

    public deleteVariete(id: number): void {
        this.communicationService.deleteVariete(id);
    }

    public isString(val: any): boolean {
        return typeof(val) === 'string';
    }

    public resetDefaultValues(): void {
        this.values = Object.values(this.variete);
    }

    public submitVariete(): void {
        this.variete.id = this.values[0];
        this.variete.name = this.values[1];
        this.variete.yearMarket = this.values[2];
        this.variete.plantingDescription = this.values[3];
        this.variete.maintenanceDescription = this.values[4];
        this.variete.seedingDescription = this.values[5];
        this.variete.harvestDescription = this.values[6];
        this.variete.plantingPeriod = this.values[7];
        this.variete.harvestPeriod = this.values[8];
        this.variete.comment = this.values[9];
        this.variete.goodSoils = this.values[10];
    }
}
