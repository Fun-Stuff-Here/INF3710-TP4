import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { JardinComponent } from "./components/jardin/jardin";
import { VarieteComponent } from "./components/variete/variete";
import { ModifyVarieteComponent } from "./components/modify-variete/modify-variete";

const routes: Routes = [
  { path: "app", component: AppComponent },
  { path: "jardin", component: JardinComponent },
  { path: "varietes", component: VarieteComponent },
  { path: "varietes/:id", component: ModifyVarieteComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }