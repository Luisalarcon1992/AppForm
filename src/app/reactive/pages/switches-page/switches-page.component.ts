import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/service/validators.service';

@Component({
  templateUrl: './switches-page.component.html',
  styles: [
  ]
})
export class SwitchesPageComponent {

  constructor(
    private formBuilder: FormBuilder,
    private validatorsService: ValidatorsService,
    ) {}

  public myForm: FormGroup = this.formBuilder.group({
      gender: ['', Validators.required ],
      wantNotifications: [ false, Validators.required ],
      termsAndConditions: [false, Validators.required ],
  });


  isValidField( field: string ): boolean | null {

    return this.validatorsService.isValidField( this.myForm, field )

  }

  onSave(): void {
    if ( this.myForm.invalid ) {
      this.myForm.markAsTouched();
      return;
    };


  }
}
