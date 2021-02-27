import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { marker } from "@biesbjerg/ngx-translate-extract-marker";
import { FilesComponent } from "./files.component";
import { HistoryComponent } from "./history/history.component";
import { UploderComponent } from "./uploder/uploder.component";
const routes: Routes = [
  // Module is lazy loaded, see app-routing.module.ts
  { path: "", component: FilesComponent, data: { title: marker("files") }, children: [
    {path: '', redirectTo: 'FileUplaod'},
    {path: 'FileUplaod', component: UploderComponent},
    {path: 'History', component: HistoryComponent},
  ] },
  
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class FilesRoutingModule {}
