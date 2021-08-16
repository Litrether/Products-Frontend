import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IChangePassword } from 'src/app/core/interfaces/accounts-interfaces';
import { NotificationService } from 'src/app/core/services/notification-service';

@Component({
  selector: 'app-change-pass-form',
  templateUrl: './change-pass-form.component.html',
  styleUrls: ['./change-pass-form.component.css']
})
export class ChangePassFormComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<IChangePassword>();

  public form: FormGroup;
  submitted: boolean = false;

  constructor(private fb: FormBuilder,
    private notice: NotificationService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      oldPassword: ['', Validators.minLength(6)],
      newPassword: ['', Validators.minLength(6)],
      confirmNewPassword: ['', Validators.minLength(6)],
    });
  }

  submit() {
    this.submitted = true;
    if (this.form.invalid) {
      this.submitted = false;
      return;
    }

    if (this.form.value.newPassword != this.form.value.confirmNewPassword) {
      this.notice.textNotice(`New passwords don't match`)
      this.submitted = false;
      return;
    }

    const changePasswordData: IChangePassword = {
      oldPassword: this.form.value.oldPassword,
      newPassword: this.form.value.newPassword,
    }

    this.submitted = false;
    this.onSubmit.emit(changePasswordData);
  }
}
