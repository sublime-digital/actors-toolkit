import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoodRecordComponent } from './mood-record/mood-record.component';
import { TraitsComponent } from './traits/traits.component';
import { AffirmationsComponent } from './affirmations/affirmations.component';
import { NewMoviesComponent } from './new-movies/new-movies.component';
import { VocalTrainingComponent } from './vocal-training/vocal-training.component';
import { GigsComponent } from './gigs/gigs.component';
import { AccountComponent } from './account/account.component';


export const routes: Routes = [
  { path: '', redirectTo: 'moodrecord', pathMatch: 'full' },
  { path: 'new-movies', component: NewMoviesComponent },
  { path: 'moodrecord', component: MoodRecordComponent },
  { path: 'traits', component: TraitsComponent },
  { path: 'vocal-training', component: VocalTrainingComponent },
  { path: 'gigs', component: GigsComponent },
  { path: 'affirmations', component: AffirmationsComponent },
  { path: 'account', component: AccountComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
