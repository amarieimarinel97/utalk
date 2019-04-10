import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/models/profile';
import { ProfilesService } from 'src/app/services/profilesservice/profiles.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {

  profile: Profile = null;
  allProfiles: Profile[] = [];





  constructor(private profilesService: ProfilesService,
    private route: ActivatedRoute,
    private router: Router) {
    profilesService.getProfiles().subscribe(
      (profilesResponse: Profile[]) => {
        this.allProfiles = profilesResponse as Profile[];
        this.profile = this.allProfiles[0];
      }
      , (err) => {
        console.log(err);
      }
    );

  }

  public updateProfile() {
  this.profilesService.updateProfile(this.profile).subscribe(() => {
      this.router.navigate(['/home']);
    });
  }

  ngOnInit() {
  }

}


