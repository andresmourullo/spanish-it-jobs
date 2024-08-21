import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { routes } from './app.routes';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { JobOfferDialogComponent } from './job-offer-dialog/job-offer-dialog.component';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    JobOfferDialogComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    MatProgressBarModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }