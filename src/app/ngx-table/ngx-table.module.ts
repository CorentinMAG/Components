import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input'; 
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OverlayModule } from '@angular/cdk/overlay';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxOverlayComponent } from './components/overlay/ngx-overlay.component';
import { NgxTableComponent } from './components/table/table.component';
import { PortalModule } from '@angular/cdk/portal';
import { MatTableModule } from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';

@NgModule({
  declarations: [
    NgxOverlayComponent,
    NgxTableComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    OverlayModule,
    BrowserModule,
    BrowserAnimationsModule,
    PortalModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatTableModule,
    MatSortModule
  ],
  exports: [
    NgxOverlayComponent,
    NgxTableComponent
  ],
  providers: [
    
  ]
})
export class NgxTableModule { }