import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from'@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  messageForm: FormGroup;
  submitted = false;
  success = false;
  response: Object;
  errorResponse: Object;

  constructor(private formBuilder: FormBuilder, private data: DataService, private _router: Router) {

    this.messageForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
    })
  }

  onSubmit() {
    this.submitted = true;

    if (this.messageForm.invalid) {
      //console.log(this.messageForm.controls);
      return;
    }
    this.success = true;
    const name = this.messageForm.controls.name.value;
    const surname = this.messageForm.controls.surname.value;
    const email = this.messageForm.controls.email.value;
    const password = this.messageForm.controls.password.value;

    let user = {
      "name": name,
      "surname": surname,
      "email": email,
      "password": password
    }

    this.data.registerUser(user)
      .subscribe(data =>{
        this._router.navigate(['/login'])
        this.response = data
      },
        error => this.errorResponse = error
      );
  }

  ngOnInit() {
  }

}
