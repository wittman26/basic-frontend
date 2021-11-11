import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TypicodeserviceService } from 'src/app/services/typicodeservice.service';

@Component({
  selector: 'app-postedit',
  templateUrl: './postedit.component.html',
  styleUrls: ['./postedit.component.css']
})
export class PosteditComponent implements OnInit {
  id: any;
  form: FormGroup;
  edit: boolean = false;

  constructor(private typicodeserviceService: TypicodeserviceService, private route: ActivatedRoute, private router: Router) {
    this.form = new FormGroup({
      'userId': new FormControl('',Validators.required),
      'id': new FormControl(''),
      'title': new FormControl('', [Validators.required]),
      'body': new FormControl('', [Validators.required]),
    });      
   }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edit = params['id'] != null;
      console.log("On init: " + this.id + this.edit);
      this.initForm();
    });    
  }

  private initForm() {
    if (this.edit) {
      this.typicodeserviceService.get(`posts?id=${this.id}`).subscribe({
        next: (response: any) => {
          let userId = response[0].userId;
          let id = response[0].id;
          let title = response[0].title;
          let body = response[0].body;

          this.form = new FormGroup({
            'userId': new FormControl(userId),
            'id': new FormControl(id),
            'title': new FormControl(title),
            'body': new FormControl(body)
          });            
          
        },
        error: (error) => console.error('Error in', '', 'json=', 'Error: ', error)
      });     

    }
  }

  operate() {

    let post = {
      userId : this.form.value['userId'],
      id : this.form.value['id'],
      title : this.form.value['title'],
      body : this.form.value['body'],        
    }    

    if (this.edit) {
      this.typicodeserviceService.patch(`posts/${this.id}`,post).subscribe({
        next: (response: any) => {          
          console.log("Response PATCH: " + JSON.stringify(response));
        },
        error: (error) => console.error('Error in', '', 'json=', 'Error: ', error)
      });  
    } else {
      this.typicodeserviceService.post(`posts`,post).subscribe({
        next: (response: any) => {          
          console.log("Response POST: " + JSON.stringify(response));
        },
        error: (error) => console.error('Error in', '', 'json=', 'Error: ', error)
      });      
    }

    this.router.navigate(['/'])
  }

}