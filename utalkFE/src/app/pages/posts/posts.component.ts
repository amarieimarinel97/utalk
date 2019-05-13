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
      
      profilesService.getProfiles().subscribe(
        (profilesResponse: Profile[]) => {
          var allProfiles = profilesResponse as Profile[];
          this.currentProfile = allProfiles[0];

          postsService.getPosts().subscribe(
            (postsResponse: Post[]) => {
              this.allPosts = postsResponse as Post[];
              this.allPosts.forEach(element => {
                if(element.profile_id==this.currentProfile.id){
                  this.currentPosts.push(element);
                }
              });
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

  //  public updatePosting() {
  //   this.postsService.updatePosting(this.currentPosts).subscribe(() => {
  //       this.router.navigate(['/home']);
  //     });
  //   }

  ngOnInit() {
  }

}
