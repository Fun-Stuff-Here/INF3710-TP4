import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpRequestManagerService } from "src/app/services/HttpRequestManager.service";
import { Rang } from "../../../../../../common/tables/Rang";

@Component({
  selector: "app-jardin-rang",
  templateUrl: "./rang.html",
  styleUrls: ["./rang.css"],
})
export class RangComponent implements OnInit {
	public rangs: Rang[] = [];
	public jardinID: string;
	public xparcelle: Number;
	public yparcelle: Number;
	
	constructor(private readonly httpManager:HttpRequestManagerService, private route: ActivatedRoute){}

	ngOnInit(): void {
		this.jardinID = (this.route.snapshot.paramMap.get('jardinID') as string);
		this.xparcelle = +(this.route.snapshot.paramMap.get('xparcelle') as string);
		this.yparcelle = +(this.route.snapshot.paramMap.get('yparcelle') as string);

		this.getRangs(this.jardinID,this.xparcelle,this.yparcelle);
	}

	private getRangs(jardinID:string, xparcelle:Number, yparcelle:Number): void {
		this.httpManager.getRangs(jardinID).subscribe((receivedRangs:Rang[])=>{
		  this.rangs = receivedRangs.filter(function(rang) {
			return rang.xparcelle == xparcelle && rang.yparcelle == yparcelle;
		});
	  });
  	}

}
