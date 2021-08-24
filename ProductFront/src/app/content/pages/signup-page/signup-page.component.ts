import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/core/account/auth-service';
import { IRegAccount } from 'src/app/core/interfaces/accounts-interfaces';
import { AccountApiService } from 'src/app/core/services/account-api.service';
import { NotificationService } from 'src/app/core/services/notification-service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {

  public form!: FormGroup;
  submitted: boolean = false;
  message: string;

  constructor(private accountService: AccountApiService,
    private authService: AuthService,
    private notice: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder) {
    document.body.style.backgroundImage = "url('assets/img/signup-bg.jpg')";
  }


  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['']);
    }

    this.route.queryParams.subscribe((params: Params) => {
      if (params.loginAgain) {
        this.message = 'Please, enter data';
      } else if (params.authFieled) {
        this.message = 'Session ended. Enter data again.'
      }
    });

    this.form = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      roles: [''],
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const regAccount: IRegAccount = {
      firstName: this.form.value.firstname,
      lastName: this.form.value.lastname,
      userName: this.form.value.username,
      password: this.form.value.password,
      email: this.form.value.email,
      roles: ['User']
    }

    if (this.form.value.password == this.form.value.confirmPassword) {
      this.accountService.CreateAccount(regAccount).subscribe((data: any) => {
        this.notice.textNotice('Account successfully created. Log in please.')
        this.submitted = false;
        this.router.navigate(['/login']);
      });
    } else {
      this.notice.textNotice(`Passwords don't match.`)
      this.form.get("password")?.setValue('');
      this.form.get("confirmPassword")?.setValue('');
      this.submitted = false;
    }
  }
}
