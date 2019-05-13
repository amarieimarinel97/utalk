import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ProfilesComponent } from './pages/profiles/profiles.component';
import { PostsComponent } from './pages/posts/posts.component';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FriendsComponent } from './pages/friends/friends.component';




const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'profiles', component: ProfilesComponent },
  { path: 'posts', component: PostsComponent },
  { path:'friends', component:FriendsComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    ProfilesComponent,
    PostsComponent,
    HomeComponent,
    FriendsComponent,
    
  
    
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule
  ],
  exports: [
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
