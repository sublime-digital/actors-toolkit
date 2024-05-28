import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MoodRecordComponent } from './mood-record/mood-record.component';
import { TraitsComponent } from './traits/traits.component';
import { AffirmationsComponent } from './affirmations/affirmations.component';

@NgModule({
  declarations: [
    AppComponent,
    MoodRecordComponent,
    TraitsComponent,
    AffirmationsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
