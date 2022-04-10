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
    public defaultValues: any[] = [];
    public yearIsGood = true;

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
        this.getVariete();
	}

    public getVariete(): void {
        this.httpManager.getVariete(this.id).subscribe((variete: Variete) => {
            this.variete = variete;
            this.values = [];
            this.defaultValues = [];
            for (const value of Object.values(this.variete)) {
                this.values.push(value);
                this.defaultValues.push(value);
            }
        });
    }

    public deleteVariete(id: number): void {
        this.httpManager.deleteVariete(id);
    }

    public isString(val: any): boolean {
        return typeof(val) === 'string';
    }

    public isYear(index: number): boolean {
        return this.attributes[index] === 'Année de mise en marché';
    }

    public isName(index: number): boolean {
        return this.attributes[index] === 'Nom';
    }

    public resetDefaultValues(): void {
        this.values = Object.values(this.variete);
    }

    public submitVariete(): void {
        if (this.values[2] < 0 || this.values[2] > 2022) {
            this.yearIsGood = false;
        } else {
        this.yearIsGood = true;
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
        this.httpManager.putVariete(this.id, this.variete).subscribe(() => {
            this.getVariete();
        });
        }
    }
}
