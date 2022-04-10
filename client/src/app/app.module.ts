import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CommunicationService } from "./communication.service";
import { JardinComponent } from "./components/jardin/jardin";
import { VarieteComponent } from "./components/variete/variete";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {MatExpansionModule} from '@angular/material/expansion';
import { JardinItemComponent } from "./components/jardin/jardin-item/jardin-item.component";
import { ModifyVarieteComponent } from "./components/modify-variete/modify-variete";
import { PlanteComponent } from "./components/plante/plante";
import { RangComponent } from "./components/jardin/Rang/rang";

@NgModule({
  declarations: [
    AppComponent,
    JardinComponent,
    VarieteComponent,
	JardinItemComponent,
    ModifyVarieteComponent,
    PlanteComponent,
	RangComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
	BrowserAnimationsModule,
	MatExpansionModule,
  	ReactiveFormsModule
  ],
  providers: [CommunicationService, {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } }],
  bootstrap: [AppComponent],
})
export class AppModule { }
