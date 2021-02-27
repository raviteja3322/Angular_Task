import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FilesComponent } from "./files.component";
import { TranslateModule } from "@ngx-translate/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MaterialModule } from "@app/material.module";
import { FilesRoutingModule } from "./files-routing.module";
import { UploderComponent } from "./uploder/uploder.component";
import { HistoryComponent } from "./history/history.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ToastContainerModule, ToastrModule } from "ngx-toastr";
import { ToastrService } from "ngx-toastr";
@NgModule({
  declarations: [FilesComponent, UploderComponent, HistoryComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    FlexLayoutModule,
    MaterialModule,
    FilesRoutingModule,
    ToastContainerModule,
    ToastrModule.forRoot(),
  ],
  providers: [ToastrService],
})
export class FilesModule {}
