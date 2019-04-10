import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/models/profile';
import { ProfilesService } from 'src/app/services/profilesservice/profiles.service';

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
      },
      (err) => { console.log(err) }
    )
  }

  ngOnInit() {
    
  }

}
