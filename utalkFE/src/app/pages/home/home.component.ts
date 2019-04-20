import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/models/profile';
import { ProfilesService } from 'src/app/services/profilesservice/profiles.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  profile: Profile = null;

  constructor(private profilesService: ProfilesService) {
    profilesService.getProfiles().subscribe(
      (profilesResponse: Profile[]) => {
        this.profile = profilesResponse[0];
        if (this.profile.photo != "no-photo") {
          document.getElementById("profile-pic").setAttribute("src", AppComponent.imagesPath + this.profile.photo);
        } else {
          console.log("This profile has no photo yet");
        }
      },
      (err) => { console.log(err) }
    )
  }

  ngOnInit() {
  }

}
