import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgxFloatingButtonModule } from './ngx-floating-button/ngx-floating-button.module';
import { NgxTableModule } from './ngx-table/ngx-table.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    NgxFloatingButtonModule,
    NgxTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
