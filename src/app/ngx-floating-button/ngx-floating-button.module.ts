import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgxFloatingButtonComponent } from './components/main/ngx-floating-button.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OverlayModule } from '@angular/cdk/overlay';
import { NgxFloatingButtonItemComponent } from './components/items/ngx-floating-button-item.component';
import { TooltipDirective } from './directives/tooltip.directive';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    NgxFloatingButtonComponent,
    NgxFloatingButtonItemComponent,
    TooltipDirective,
    TooltipComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    OverlayModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  exports: [
    NgxFloatingButtonComponent,
    NgxFloatingButtonItemComponent
  ]
})
export class NgxFloatingButtonModule { }
