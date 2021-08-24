import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/core/services/notification-service';

@Component({
  selector: 'app-string-form',
  templateUrl: './string-form.component.html',
  styleUrls: ['./string-form.component.css']
})
export class StringFormComponent implements OnInit {
  @Input() placeholder: string;
  @Input() inputValue: string;
  @Input() inputType: string = 'text';
  @Input() minLength: number = 3;
  @Output() onSubmit = new EventEmitter<string>();

  public form: FormGroup;
  value: string;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      value: [this.inputValue, Validators.minLength(this.minLength)]
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.value = this.form.value.value;
    this.onSubmit.emit(this.value);
  }
}

