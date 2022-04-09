import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Variete } from "../../../../../../common/tables/Variete";
import { HttpRequestManagerService } from "src/app/services/HttpRequestManager.service";

@Component({
  selector: "app-jardin-rang-variete",
  templateUrl: "./varietes.html",
  styleUrls: ["./varietes.css"],
})
export class JardinVarietesComponent implements OnInit {
	varietes: Variete[] = [];
	jardinID: string;
	xrang: Number;
	yrang: Number;
	numeroRang: Number;
	xparcelle: Number;
	yparcelle: Number;
	
	constructor(
		private readonly httpManager:HttpRequestManagerService, 
		private route: ActivatedRoute,
		private router: Router
	){}

	ngOnInit(): void {
		this.jardinID = (this.route.snapshot.paramMap.get('jardinID') as string);
		this.xrang = +(this.route.snapshot.paramMap.get('xrang') as string);
		this.yrang = +(this.route.snapshot.paramMap.get('yrang') as string);
		this.numeroRang = +(this.route.snapshot.paramMap.get('numerorang') as string);
		this.xparcelle = +(this.route.snapshot.paramMap.get('xparcelle') as string);
		this.yparcelle = +(this.route.snapshot.paramMap.get('yparcelle') as string);
		this.getVarietesOfRang(this.jardinID,this.xrang,this.yrang, this.numeroRang);
	}

	private getVarietesOfRang(jardinID:string, xrang:Number, yrang:Number, numeroRang: Number): void {
		this.httpManager.getVarietesOfRang(jardinID, numeroRang, xrang, yrang).subscribe((receivedVarietes:Variete[])=>{
		  this.varietes = receivedVarietes;
	  });
  	}
	
	goBack(){
		this.router.navigate(['/rang/' + this.jardinID + '/'+ this.xparcelle + '/' + this.yparcelle]);
	}
}
