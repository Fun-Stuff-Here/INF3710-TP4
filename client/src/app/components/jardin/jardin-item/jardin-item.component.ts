import { Component, OnInit, Input } from '@angular/core';
import { Parcelle } from "../../../../../../common/tables/Parcelle";
import { HttpRequestManagerService } from "src/app/services/HttpRequestManager.service";
import { Router } from '@angular/router';
@Component({
  selector: 'app-jardin-item',
  templateUrl: './jardin-item.component.html',
  styleUrls: ['./jardin-item.component.css']
})
export class JardinItemComponent implements OnInit {
	public parcelles: Parcelle[] = [];
	@Input() item: any;
	constructor(private readonly httpManager:HttpRequestManagerService, private router: Router){}
	
	ngOnInit() {
	}
	
	private getParcelles(jardinID:string): void {
		this.httpManager.getParcelles(jardinID).subscribe((receivedParcelles:Parcelle[])=>{
			this.parcelles = receivedParcelles;
		});
	}

	showInfo(jardinID:string) {
		this.getParcelles(jardinID);
	}

	goToRang(parcelle: Parcelle): void {
        this.router.navigate(['/rang/' + parcelle.jardinid + '/' + parcelle.xparcelle + '/' + parcelle.yparcelle]);
    }
}