import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpRequestManagerService } from "src/app/services/HttpRequestManager.service";
import { Rang } from "../../../../../../common/tables/Rang";

@Component({
  selector: "app-jardin-rang",
  templateUrl: "./rang.html",
  styleUrls: ["./rang.css"],
})
export class RangComponent implements OnInit {
	rangs: Rang[] = [];
	jardinID: string;
	xparcelle: Number;
	yparcelle: Number;
	
	constructor(
		private readonly httpManager:HttpRequestManagerService, 
		private route: ActivatedRoute,
		private router: Router
	){}

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
	
	goBack(){
		this.router.navigate(['/jardin']);
	}

	goToVariete(rang: Rang): void {
        this.router.navigate(['/rang/varietes/' + rang.jardinid + '/' + rang.numerorang + '/' + rang.xrang + '/' + rang.yrang + '/' + rang.xparcelle + '/' + rang.yparcelle]);
    }

}
