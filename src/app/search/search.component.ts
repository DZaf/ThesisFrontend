import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  showMore = false;
  messageForm: FormGroup;
  spinner = false;
  code = true;
  web_apis = false;
  everywere = false;
  codeResponse: any;
  apisResponse: any;
  keyword: String;
  tags = [];
  /* edo to mail tou xristi */
  email: any = localStorage.getItem('email');
  constructor(private formBuilder: FormBuilder, private data: DataService, private _router: Router) {

    this.messageForm = this.formBuilder.group({
      keyword: ['', Validators.required],
      language: ['', Validators.required]
    })


  }

  ngOnInit() {

    this.data.Verify()
      .subscribe(result => { },
        error => { this._router.navigate(['/login']) });

  }

  onClick(input) {

    if (input == "code") {
      this.code = true; this.web_apis = false; this.everywere = false;
    }
    else if (input == "web_apis") {
      this.code = false; this.web_apis = true; this.everywere = false;

    } else {
      this.code = false; this.web_apis = false; this.everywere = true;
    }


  }

  show_more($event, div_class) {

    String(div_class).replace(/./, ' ');
    String(div_class).replace(/ /, '-');
    console.log(div_class);
    let showMoreDiv = document.getElementById(div_class);
    console.log(showMoreDiv);
    if (showMoreDiv.style.display == "flex") {
      showMoreDiv.style.display = "none";
      $event.currentTarget.innerHTML = "show more";
    } else {
      showMoreDiv.style.display = "flex";
      $event.currentTarget.innerHTML = "show less";
    }


    // .style.display = "block"; 
  }



  onSubmit() {
    delete this.apisResponse;
    this.spinner = true;
    delete this.codeResponse;

    if (this.code) {
      console.log("submiting form for Code search");

      this.keyword = this.messageForm.controls.keyword.value;
      const language = this.messageForm.controls.language.value;

      this.data.gitsearch(this.keyword, language)
        .subscribe(result => {
          this.spinner = false;
          this.codeResponse = result;
          console.log(result);;
        },
          error => {
            //this.errorResponse = error; 
            console.log(error);
          });

    }
    else if (this.web_apis) {
      console.log("submiting form for  Apis search");

      this.keyword = this.messageForm.controls.keyword.value;
      //console.log(this.keyword);

      //this.tags.push(this.keyword);
      this.tags.push(this.keyword.split(/(\s+)/).filter( e => e.trim().length > 0));
      console.log(this.tags);
      //return 0 ;

      this.data.apiSearch(this.email, this.tags).subscribe(result => {
        this.spinner = false;
        this.apisResponse = result;
        console.log(this.apisResponse);
        this.tags = [];
      })

    } else {
      console.log("submiting form for all");

    }


  }




}
