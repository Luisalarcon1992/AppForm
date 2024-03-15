import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/service/validators.service';
import { EmailValidatorService } from 'src/app/shared/validators/email-validator.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styles: [
  ]
})
export class RegisterPageComponent {


  constructor (
    private formBuilder: FormBuilder,
    private validatorsService: ValidatorsService,
    ) {}

  public myForm: FormGroup = this.formBuilder.group({
    name: ['', [ Validators.required, Validators.pattern(this.validatorsService.firstNameAndLastnamePattern )], [ new EmailValidatorService() ]],
    email: ['', [ Validators.required, Validators.pattern(this.validatorsService.emailPattern) ]],
    userName: ['', [ Validators.required, this.validatorsService.cantBeStrider ]],
    password: ['', [ Validators.required, Validators.minLength(6) ]],
    password2: ['', [ Validators.required ]],
  },
  {
    // con este validador, todo el formulario pasa como argumento para las validaciones, todos los campos
    validators: [
      this.validatorsService.isFieldsEquals('password', 'password2')
    ]
  })


  isValidField( field: string ){
    return this.validatorsService.isValidField( this.myForm, field)
  }

  onSubmit(): void {
    this.myForm.markAllAsTouched()
  }

}
