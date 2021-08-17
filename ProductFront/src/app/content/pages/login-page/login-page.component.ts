import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/core/account/auth-service';
import { IAuthAccount } from 'src/app/core/interfaces/accounts-interfaces';
import { NotificationService } from 'src/app/core/services/notification-service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  @Input() authFailed = false;

  public form!: FormGroup;
  submitted: boolean = false;
  message: string;


  constructor(public authService: AuthService,
    private notice: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder) {
    document.body.style.backgroundImage = "url('assets/img/login-bg.jpg')";
  }

  ngOnInit() {
    console.log(this.authFailed)
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['']);
    }

    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const authAccount: IAuthAccount = {
      username: this.form.value.username,
      password: this.form.value.password
    }

    this.authService.login(authAccount).subscribe(() => {
      this.form.reset();
      this.router.navigate(['/user', "products"]);
      this.submitted = false;
    }, () => {
      this.submitted = false;
    });
  }
}
