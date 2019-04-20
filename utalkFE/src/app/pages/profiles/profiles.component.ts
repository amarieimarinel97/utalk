import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/models/profile';
import { ProfilesService } from 'src/app/services/profilesservice/profiles.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {

  profile: Profile = null;
  allProfiles: Profile[] = [];

  selectedFile: File = null;


  constructor(private profilesService: ProfilesService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient) {
    profilesService.getProfiles().subscribe(
      (profilesResponse: Profile[]) => {
        this.allProfiles = profilesResponse as Profile[];
        this.profile = this.allProfiles[0];
        if (this.profile.photo != "no-photo") {
          document.getElementById("profile-pic").setAttribute("src", AppComponent.imagesPath + this.profile.photo);
        } else {
          console.log("This profile has no photo yet");
        }
      }
      , (err) => {
        console.log(err);
      }
    );

  }

  public onUpload() {
    const fd = new FormData();
    fd.append('file', this.selectedFile);
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    this.http.post(AppComponent.serverUrl + "files", fd,
      { headers: headers }
    )
      .subscribe(() => {
        this.profile.photo = this.selectedFile.name;
        this.updateProfile(false);
      }
      );

  }

  public onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    this.onUpload();
  }

  public updateProfile(redirect: boolean) {
    this.profilesService.updateProfile(this.profile).subscribe(() => {
      if (redirect)
        this.router.navigate(['/home']);
    });
  }

  testIt() {
    console.log(this.profile.photo);
  }

  ngOnInit() {

  }

}


