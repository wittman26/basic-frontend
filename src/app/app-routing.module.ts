import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostComponent } from './pages/post/post.component';
import { PosteditComponent } from './pages/postedit/postedit.component';

const routes: Routes = [
  { path: '', component: PostComponent, children: [
    { path: 'new', component: PosteditComponent },
    { path: 'edit/:id', component: PosteditComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
