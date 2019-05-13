import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostsService } from 'src/app/services/postsservice/posts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from 'src/app/models/profile';
import { ProfilesService } from 'src/app/services/profilesservice/profiles.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  currentPosts: Post[] = [];
  allPosts: Post[] = [];
  currentProfile: Profile=null;

 
  constructor(private postsService: PostsService,
    private profilesService: ProfilesService,
    private route: ActivatedRoute,
    private router: Router) {
      if(!window.localStorage.getItem("profile-id")){
        this.router.navigate(['/login']);
      }
      profilesService.getProfiles().subscribe(
        (profilesResponse: Profile[]) => {
          var allProfiles = profilesResponse as Profile[];
          allProfiles.forEach((profile)=>{
            if(profile.id==parseInt(window.localStorage.getItem("profile-id"))){
              this.currentProfile = profile;
            }
          });

          postsService.getPosts().subscribe(
            (postsResponse: Post[]) => {
              this.allPosts = postsResponse as Post[];
              this.allPosts.forEach(element => {
                if(element.profile_id==this.currentProfile.id){
                  this.currentPosts.push(element);
                }
              });
              this.currentPosts.sort(
                (postA, postB)=>{
                  return (new Date(postA.posted_on).getTime()>new Date(postB.posted_on).getTime()?-1:1);
                }
              );
              console.log(this.currentPosts);
            }
            , (err) => {
              console.log(err);
            }
          );

        }
        , (err) => {
          console.log(err);
        }
      );
   }

  ngOnInit() {
  }

}
