import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Profile } from 'src/app/models/profile';
import { ProfilesService } from 'src/app/services/profilesservice/profiles.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppComponent } from 'src/app/app.component';
import { Friends } from 'src/app/models/friend'
import { FriendService } from 'src/app/services/friendservice/friend.service';


@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FriendsComponent implements OnInit {

  allFriends: Friends[] = [];
  currentFriends: Profile[] = [];
  photoUrl: string = "";
  thisProfile: Profile = null;
  allProfiles: Profile[] = [];
  selectedFile: File = null;
  currentFriendsIds: number[] = [];



  constructor(private profilesService: ProfilesService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private friendService: FriendService) {
    if (window.localStorage.getItem("profile-id")) {
      this.photoUrl = AppComponent.imagesPath;
      profilesService.getProfileById(parseInt(window.localStorage.getItem("profile-id"))).subscribe(
        (profileResponse: Profile) => {
          this.thisProfile = profileResponse;
        },
        (err) => { this.router.navigate(['/login']); }
      );
    } else {
      this.router.navigate(['/login']);
    }

    friendService.getAllFriends().subscribe(
      (friendsResponse: Friends[]) => {
        this.allFriends = friendsResponse as Friends[];

        this.allFriends.forEach((friend) => {
          if (friend.user_id1 == parseInt(window.localStorage.getItem("profile-id"))) {
            this.currentFriendsIds.push(friend.user_id2);
          }
        });
        this.currentFriendsIds.forEach((friendId) => {
          this.profilesService.getProfileById(friendId).subscribe(
            (profileResponse: Profile) => {
              this.currentFriends.push(profileResponse);
            }
          );
        });
      },
      (err) => {
        console.log(err);
      }

    );

  }


  areAllFriendsLoaded(): boolean {
    if (this.currentFriends && this.currentFriendsIds && this.currentFriends.length > 0 && this.currentFriendsIds.length == this.currentFriends.length) {
      return true;
    }
    return false;
  }


  ngOnInit() {
  }



}
