import { Component, OnInit } from "@angular/core";
import { Variete } from "../../../../../common/tables/Variete";
import { Router } from '@angular/router';
import { HttpRequestManagerService } from "src/app/services/HttpRequestManager.service";

@Component({
  selector: "app-varietes",
  templateUrl: "./variete.html",
  styleUrls: ["./variete.css"],
})
export class VarieteComponent implements OnInit {
	public varietes: Variete[];
	
	public constructor(private readonly httpManager: HttpRequestManagerService, private router: Router) {}

	public ngOnInit(): void {
        this.getVarietes();
	}

    public getVarietes(): void {
        this.httpManager.getVarietes().subscribe((varietesReceived: Variete[]) => {
            this.varietes = varietesReceived;
        });
    }

    public deleteVariete(id: number): void {
        this.httpManager.deleteVariete(id).subscribe(() => {
            this.getVarietes();
        });
    }

    public goToModify(id: number): void {
        this.router.navigate(['/varietes/' + id]);
    }
}
