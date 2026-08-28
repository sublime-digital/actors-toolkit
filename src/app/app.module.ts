import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MoodRecordComponent } from './mood-record/mood-record.component';
import { TraitsComponent } from './traits/traits.component';
import { AffirmationsComponent } from './affirmations/affirmations.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MoodRecordComponent,
    TraitsComponent,
  ],
  imports: [
    AffirmationsComponent,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
