import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MoodRecordComponent } from './mood-record/mood-record.component';
import { TraitsComponent } from './traits/traits.component';
import { AffirmationsComponent } from './affirmations/affirmations.component';
import { HttpClientModule } from '@angular/common/http';
import { NewMoviesComponent } from './new-movies/new-movies.component';
import { VocalTrainingComponent } from './vocal-training/vocal-training.component';
import { GigsComponent } from './gigs/gigs.component';

@NgModule({
  declarations: [
  
    VocalTrainingComponent,
       GigsComponent
  ],
  imports: [
    AppComponent,
    TraitsComponent,
    MoodRecordComponent,
    AffirmationsComponent,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NewMoviesComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
