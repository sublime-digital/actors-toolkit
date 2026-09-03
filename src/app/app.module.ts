import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MoodRecordComponent } from './mood-record/mood-record.component';
import { TraitsComponent } from './traits/traits.component';
import { AffirmationsComponent } from './affirmations/affirmations.component';
import { HttpClientModule } from '@angular/common/http';
import { NewMoviesComponent } from './new-movies/new-movies.component';

@NgModule({
  declarations: [
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
