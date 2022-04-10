import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpRequestManagerService } from "src/app/services/HttpRequestManager.service";
import { Variete } from "../../../../../../common/tables/Variete";
import { VueRang } from "../../../../../../common/tables/VueRang";

@Component({
  selector: "app-jardin-rang",
  templateUrl: "./rang.html",
  styleUrls: ["./rang.css"],
})
export class RangComponent implements OnInit {
	rangs: VueRang[] = [];
	jardinID: string;
	xparcelle: Number;
	yparcelle: Number;
	
	constructor(
		private readonly httpManager:HttpRequestManagerService, 
		private route: ActivatedRoute,
		private router: Router
	){}

	ngOnInit() {
		this.jardinID = (this.route.snapshot.paramMap.get('jardinID') as string);
		this.xparcelle = +(this.route.snapshot.paramMap.get('xparcelle') as string);
		this.yparcelle = +(this.route.snapshot.paramMap.get('yparcelle') as string);

		this.getRangsAndVarietes(this.jardinID,this.xparcelle,this.yparcelle);
	} 
	
	getRangsAndVarietes(jardinID:string, xparcelle:Number, yparcelle:Number) {
		this.httpManager.getRangsAndVarietes(jardinID, xparcelle,yparcelle).subscribe((receivedRangs:VueRang[])=>{
		  this.rangs = receivedRangs;
		  this.getVarieteName();
		});
  	} 
	
	getVarieteName(){
		this.rangs.forEach(rang => {
			if(rang.varieteid){
				let id: number = +rang.varieteid;
				this.httpManager.getVariete(id).subscribe((rangVariete: Variete) => {
					rang.nomVariete = rangVariete.nomvariete;
				});
			}
		});
	}

	goBack(){
		this.router.navigate(['/jardin']);
	}
}
