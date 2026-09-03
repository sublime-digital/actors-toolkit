import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoodRecordComponent } from './mood-record/mood-record.component';
import { TraitsComponent } from './traits/traits.component';
import { AffirmationsComponent } from './affirmations/affirmations.component';
import { NewMoviesComponent } from './new-movies/new-movies.component';


export const routes: Routes = [
  { path: '', redirectTo: 'moodrecord', pathMatch: 'full' },
  { path: 'new-movies', component: NewMoviesComponent },
  { path: 'moodrecord', component: MoodRecordComponent },
  { path: 'traits', component: TraitsComponent },
  { path: 'affirmations', component: AffirmationsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
