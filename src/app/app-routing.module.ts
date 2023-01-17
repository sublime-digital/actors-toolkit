import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoodRecordComponent } from './mood-record/mood-record.component';
import { FreewriteComponent } from './freewrite/freewrite.component';
import { StrugglesComponent } from './struggles/struggles.component';
import { CareertipsComponent } from './careertips/careertips.component';

const routes: Routes = [
  { path: '',   redirectTo: 'coverletter', pathMatch: 'full' },
  { path: 'moodrecord', component: MoodRecordComponent },
  { path: 'freewrite', component: FreewriteComponent },
  { path: 'struggles', component: StrugglesComponent },
  { path: 'careertips', component: CareertipsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
