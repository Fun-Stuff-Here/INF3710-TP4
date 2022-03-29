import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { JardinComponent } from "./components/jardin/jardin";

const routes: Routes = [
  { path: "app", component: AppComponent },
  { path: "jardin", component: JardinComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }