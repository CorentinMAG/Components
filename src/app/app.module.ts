import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgxFloatingButtonModule } from './ngx-floating-button/ngx-floating-button.module';
import { NgxOverlayFilterModule } from './ngx-overlayFilter/ngx-overlayfilter.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    NgxFloatingButtonModule,
    NgxOverlayFilterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
