import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { AccountService } from 'src/app/core/account/account.service';
import { IRegAccount } from 'src/app/core/interfaces/accounts-interfaces';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {

  public form!: FormGroup;
  submitted: boolean = false;
  message :string;

  constructor(public accountService: AccountService,
              private route: ActivatedRoute,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe( (params: Params) => {
      if(params.loginAgain){
        this.message = 'Please, enter data';
      } else if (params.authFieled){
        this.message = 'Session ended. Enter data again.'
      }
    });

    this.form = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      repeatedPassword: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [''],
      roles: [''],
    });
  }

  submit(){
    if(this.form.invalid){
      return;
    }


    this.submitted = true;

    const regAccount: IRegAccount = {
    firstname: this.form.value.firstname,
    lastname: this.form.value.lastname,
    username: this.form.value.username,
    password: this.form.value.password,
    email: this.form.value.email,
    phoneNumber: this.form.value.phoneNumber,
    roles: 'User'
    }


    if(this.form.value.password == this.form.value.repeatedPassword){
      this.accountService.registration(regAccount);
    }
  }
}
