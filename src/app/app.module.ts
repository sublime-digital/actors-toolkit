import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MoodRecordComponent } from './mood-record/mood-record.component';
import { StrugglesComponent } from './struggles/struggles.component';
import { AffirmationsComponent } from './affirmations/affirmations.component';

@NgModule({
  declarations: [
    AppComponent,
    MoodRecordComponent,
    StrugglesComponent,
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
