import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { IAuthAccount } from 'src/app/core/interfaces/accounts-interfaces';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  public form!: FormGroup;
  submitted: boolean = false;
  message: string;


  constructor(public authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.route.queryParams.subscribe( (params: Params) => {
      if(params.loginAgain){
        this.message = 'Please, enter data';
      } else if (params.authFieled){
        this.message = 'Session ended. Enter data again.'
      }
    });

    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  submit(){
    if(this.form.invalid){
      return;
    }

    this.submitted = true;

    const authAccount: IAuthAccount = {
      username: this.form.value.username,
      password: this.form.value.password
    }

    this.authService.login(authAccount).subscribe(() => {
      this.form.reset();
      this.router.navigate(["/products"]);
      this.submitted = false;
    }, () => {
      this.submitted = false;
    });
  }
}
