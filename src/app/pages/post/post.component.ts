import { Component, OnInit } from '@angular/core';
import { TypicodeserviceService } from 'src/app/services/typicodeservice.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  postResults: any;
  userid: any;
  param: string = 'posts';

  constructor(private typicodeserviceService: TypicodeserviceService) { }

  ngOnInit(): void {
    this.getResults(this.param);
  }

  getResults(param: string) {

    this.typicodeserviceService.get(param).subscribe({
      next: (response) => {
        this.postResults = response;
        // console.log("Respuesta: " + JSON.stringify(this.postResults));        
      },
      error: (error) => console.error('Error in', '', 'json=', 'Error: ', error)
    });
  }

  search(userid = undefined) {
    if(userid)
      this.param = `posts?userId=${userid}`;
    else {
      this.userid = '';
      this.param = `posts`;
    }
    this.getResults(this.param); 
  }

}
