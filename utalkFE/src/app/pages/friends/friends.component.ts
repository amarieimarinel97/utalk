import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/models/profile';
import { ProfilesService } from 'src/app/services/profilesservice/profiles.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppComponent } from 'src/app/app.component';
import {Friends} from 'src/app/models/friend'
import { FriendService } from 'src/app/services/friendservice/friend.service';




@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  friend : Friends = null;
  allFriends: Friends[]=[];
  profile: Profile = null;
  allProfiles: Profile[] = [];

  selectedFile: File = null;

  

  constructor(private profilesService: ProfilesService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private friendService: FriendService) {
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
    friendService.getAllFriends().subscribe(
      (friendsResponse: Friends[])  => {
        this.allFriends = friendsResponse as Friends[];
        this.friend = this.allFriends[0];
        var profil = this.profile;

       // var HTML = "<table border=1 width=100%><td>";
        var j;
        var HTML = "<p><p>";
         for(j=0;j<this.allFriends.length;j++)
       {
         
        //HTML += "<td align=center>"+String.fromCharCode(j+64)+"</td>";
        if (profil.id ==this.allFriends[j].user_id2 ){
        for(var x=0;x<this.allProfiles.length;++x){
          if(this.allProfiles[x].id == this.allFriends[j].user_id1){
        HTML += "<p align=center>" + this.allProfiles[x].id+" "+ this.allProfiles[x].name + "   <img src= " +AppComponent.imagesPath + this.profile.photo + ">"+ " </p>";
          }
         }
        }
       }
       //HTML += "</td></table>";
      

        document.getElementById("outputDiv").innerHTML = HTML; 

      }
      , (err) => {
        console.log(err);
      }
    
    );
   // alert(this.friend);
  //    this.draw();
  
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
  
  

  public draw(){
    var HTML = "<table border=1 width=100%><td>";
    for(var j=1;j<=10;j++)
   {
      //HTML += "<td align=center>"+String.fromCharCode(j+64)+"</td>";
      HTML += "<p><tr align=center> asdasd </tr></p>";
   }
   HTML += "</td></table>";
   document.getElementById("outputDiv").innerHTML = HTML;
  }
 

  

  
  
  public drawFriends(){
    var HTML = "<table border=1 width=100%><td>";
    for(var j=0;j<10;j++){
      HTML += "<p><tr align=center> asdasd </tr></p>";
    }
    HTML += "</td></table>";
    document.getElementById("outputDiv").innerHTML = HTML;
  }
  
  ngOnInit() {
    //this.draw();
    //this.drawFriends();
    //this.alerta();  
  // alert(this.allFriends[0]);
  
    
  }
  
  

}
