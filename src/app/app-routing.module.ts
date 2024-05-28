import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoodRecordComponent } from './mood-record/mood-record.component';
import { TraitsComponent } from './traits/traits.component';
import { AffirmationsComponent } from './affirmations/affirmations.component';


const routes: Routes = [
  { path: '',   redirectTo: 'struggles', pathMatch: 'full' },
  { path: 'moodrecord', component: MoodRecordComponent },
  { path: 'struggles', component: TraitsComponent },
  { path: 'affirmations', component: AffirmationsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
