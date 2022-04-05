import { Component, OnInit } from "@angular/core";
import { Variete } from "../../../../../common/tables/Variete";
// import { CommunicationService } from "../../communication.service";
import { ActivatedRoute } from "@angular/router";
import { HttpRequestManagerService } from "src/app/services/HttpRequestManager.service";

@Component({
  selector: "app-modify-variete",
  templateUrl: "./modify-variete.html",
  styleUrls: ["./modify-variete.css"],
})
export class ModifyVarieteComponent implements OnInit {
	public variete: Variete;
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

	
	public constructor(private readonly httpManager: HttpRequestManagerService, private route: ActivatedRoute) {}

	public ngOnInit(): void {
        this.id = +(this.route.snapshot.paramMap.get('id') as string);
        console.log(this.id);
        this.httpManager.getVariete(this.id).subscribe((variete: Variete) => {
            this.variete = variete;
            for (const value of Object.values(this.variete)) {
                this.values.push(value);
            }
        });
	}

    public deleteVariete(id: number): void {
        this.httpManager.deleteVariete(id);
    }

    public isString(val: any): boolean {
        return typeof(val) === 'string';
    }

    public resetDefaultValues(): void {
        this.values = Object.values(this.variete);
    }

    public submitVariete(): void {
        this.variete.varieteid = this.values[0];
        this.variete.nomvariete = this.values[1];
        this.variete.anneemiseenmarche = this.values[2];
        this.variete.descriptionplantation = this.values[3];
        this.variete.descriptionentretien = this.values[4];
        this.variete.descriptionsemis = this.values[5];
        this.variete.descriptionrecolte = this.values[6];
        this.variete.periodemiseplace = this.values[7];
        this.variete.perioderecolte = this.values[8];
        this.variete.commentaire = this.values[9];
        this.variete.solsbiensadaptes = this.values[10];
    }
}
