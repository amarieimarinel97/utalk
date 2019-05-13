import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ProfilesComponent } from './pages/profiles/profiles.component';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ContactComponent } from './pages/contact/contact.component';
import { SiteMapComponent } from './pages/site-map/site-map.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'profiles', component: ProfilesComponent },
  { path: 'sitemap', component: SiteMapComponent },
  { path: 'aboutus', component: AboutUsComponent }
]


@NgModule({
  declarations: [
    AppComponent,
    ProfilesComponent,
    HomeComponent,
    ContactComponent,
    SiteMapComponent,
    AboutUsComponent,
    LoginComponent
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
