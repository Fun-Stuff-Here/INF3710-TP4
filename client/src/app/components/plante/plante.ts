import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpRequestManagerService } from "src/app/services/HttpRequestManager.service";
import {Plant} from '../../../../../common/tables/Plant';

@Component({
    selector: "app-plante",
    templateUrl: "./plante.html",
    styleUrls: ["./plante.css"],
  })
  export class PlanteComponent implements OnInit{
      plantes:Plant[] = [];
      searchBar: FormGroup;
      
      constructor(private readonly httpManager:HttpRequestManagerService,private formBuilder: FormBuilder,){}
      
      ngOnInit(): void {
          this.initSearchBar();
        this.getplants(" ");
      }

      onSubmit(){
          this.getplants(this.searchBar.value.searchInfo);
        this.searchBar.reset();
        }

      private initSearchBar(){
        const validator = [];

        validator.push(Validators.required);
        validator.push(Validators.pattern('[a-zA-ZéÉèÈàÀùÙêÊëË]*'));
        this.searchBar = this.formBuilder.group({
            searchInfo: ['', { validators: validator, updateOn: 'change' }],
        });
    }
    private getplants(plante:string){
        this.httpManager.getplantes(plante).subscribe((receivedPlants:Plant[])=>{
            this.plantes = receivedPlants;
        }
        );
    }
  }