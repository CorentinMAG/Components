import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';

import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

import { DataService } from './services/data.service';
import { TableComponent } from './components/table/table.component';

const MatModule = [
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
];

const CdkModule = [
    OverlayModule,
    PortalModule
];


@NgModule({
  declarations: [

  
    TableComponent
  ],
  imports: [
      CommonModule,
      ...MatModule,
      ...CdkModule
  ],
  providers: [
      DataService
  ]
})
export class NgxTableModule { }