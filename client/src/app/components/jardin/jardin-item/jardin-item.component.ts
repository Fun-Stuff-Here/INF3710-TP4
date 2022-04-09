import { Component, OnInit, Input } from '@angular/core';
import { Parcelle } from "../../../../../../common/tables/Parcelle";
import { HttpRequestManagerService } from "src/app/services/HttpRequestManager.service";
import { Rang } from '../../../../../../common/tables/Rang';
@Component({
  selector: 'app-jardin-item',
  templateUrl: './jardin-item.component.html',
  styleUrls: ['./jardin-item.component.css']
})
export class JardinItemComponent implements OnInit {
	public parcelles: Parcelle[] = [];
	public rangs: Rang[] = [];
	@Input() item: any;
	constructor(private readonly httpManager:HttpRequestManagerService){}
	
	ngOnInit() {
	}
	
	private getParcelles(jardinID:string): void {
		this.httpManager.getParcelles(jardinID).subscribe((receivedParcelles:Parcelle[])=>{
			this.parcelles = receivedParcelles;
		});
	}

	private getRangs(jardinID:string): void {
		this.httpManager.getRangs(jardinID).subscribe((receivedRangs:Rang[])=>{
		  this.rangs = receivedRangs;
	  });
  	}

	showInfo(jardinID:string) {
		this.getParcelles(jardinID);
	}
	
	showRang(parcelle: Parcelle){
		this.getRangs(parcelle.jardinid);
		this.rangs.filter(function(rang) {
			return rang.xparcelle == parcelle.xparcelle && rang.yparcelle == parcelle.yparcelle;
		});
	}
}