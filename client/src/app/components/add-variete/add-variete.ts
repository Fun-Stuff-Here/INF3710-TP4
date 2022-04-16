import { Component, OnInit } from "@angular/core";
import { Variete } from "../../../../../common/tables/Variete";
// import { CommunicationService } from "../../communication.service";
// import { ActivatedRoute } from "@angular/router";
import { HttpRequestManagerService } from "src/app/services/HttpRequestManager.service";

@Component({
  selector: "app-add-variete",
  templateUrl: "./add-variete.html",
  styleUrls: ["./add-variete.css"],
})
export class AddVarieteComponent implements OnInit {
    private varietes: Variete[];
	public variete: Variete = {
        varieteid: 0,
        nomvariete: "",
        anneemiseenmarche: 0,
        descriptionplantation: "",
        descriptionentretien: "",
        descriptionsemis: "",
        descriptionrecolte: "",
        periodemiseplace: "",
        perioderecolte: "",
        commentaire: "",
        solsbiensadaptes: "",
    };
    public values: any[] = [];
    public defaultValues: any[] = [
        0,
        "",
        0,
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
    ];
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
    public hasAdded: boolean = false;
	
	public constructor(private readonly httpManager: HttpRequestManagerService, /*private route: ActivatedRoute*/) {}

    ngOnInit(): void {
        this.httpManager.getVarietes().subscribe((varietesReceived: Variete[]) => {
            this.varietes = varietesReceived;
            for (const variete of this.varietes) {
                if (variete.varieteid > this.variete.varieteid) {
                    this.variete.varieteid = variete.varieteid;
                }
            }
            this.variete.varieteid++;
            this.defaultValues[0] = this.variete.varieteid;
            this.values = Object.values(this.variete);
        });
    }

    public isString(val: any): boolean {
        return typeof(val) === 'string';
    }

    public isNumber(val: any): boolean {
        return typeof(val) === 'number';
    }

    public isYear(index: number): boolean {
        return this.attributes[index] === 'Année de mise en marché';
    }

    public isName(index: number): boolean {
        return this.attributes[index] === 'Nom';
    }

    // public resetDefaultValues(): void {
    //     this.values = Object.values(this.variete);
    // }

    public submitVariete(): void {
        console.log(this.variete.varieteid);
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
        this.httpManager.putNewVariete(this.variete).subscribe(() => {
            this.hasAdded = true;
        });
        }
    }
}
