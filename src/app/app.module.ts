import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MoodRecordComponent } from './mood-record/mood-record.component';
import { FreewriteComponent } from './freewrite/freewrite.component';
import { StrugglesComponent } from './struggles/struggles.component';
import { AffirmationsComponent } from './affirmations/affirmations.component';
import { CareertipsComponent } from './careertips/careertips.component';

@NgModule({
  declarations: [
    AppComponent,
    MoodRecordComponent,
    FreewriteComponent,
    StrugglesComponent,
    AffirmationsComponent,
    CareertipsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
