import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-register-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {
  private readonly fb = inject(FormBuilder);
  formUtils = FormUtils;

  myForm: FormGroup = this.fb.group({
    fullName: ['', [
      Validators.required,
      Validators.pattern(this.formUtils.namePattern)]
    ],
    email: ['', [
      Validators.required,
      Validators.pattern(this.formUtils.emailPattern)],
      [this.formUtils.checkingServerResponse]
    ],
    userName: ['', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(this.formUtils.notOnlySpacesPattern),
      this.formUtils.notStrider]
    ],
    password: ['', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(this.formUtils.notOnlySpacesPattern),
      Validators.pattern(this.formUtils.passwordPattern)]
    ],
      passwordConfirmation: ['', Validators.required],
  },{
    validators: [
      this.formUtils.isFieldOneEqualFieldTwo('password', 'passwordConfirmation'),
    ],
  });

  onSubmit() {
    this.myForm.markAllAsTouched();
  }
}
