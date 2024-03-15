import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/service/validators.service';

@Component({
  templateUrl: './basic-page.component.html',
  styles: [
  ]
})
export class BasicPageComponent implements OnInit{


  /*
  const product = {
    name, 'Producto',
    price: 0,
    inStorage: 0,
  }
  Se podría mandar este objeto en el ngOnInit para establecer el dato que aparecerá al inicio del formulario
  */
 ngOnInit(): void {
   //this.myForm.reset() // acá se podría iniciarliazar el contenido de los campos para mostrar en el formulario
 }

  constructor(
    private formBuilder: FormBuilder,
    private validatorsService: ValidatorsService,
    ) {}


  public myForm: FormGroup = this.formBuilder.group({
    name: ['', [ Validators.required, Validators.minLength(3) ] ],
    price: [0, [ Validators.required, Validators.min(0) ] ],
    inStorage: [0, [ Validators.required, Validators.min(0) ]],
  })


  /*
   public myForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required, Validators.minLength(3) ] ],
    price: [0, [ Validators.required, Validators.min(0) ] ],
    inStorage: [0, [ Validators.required, Validators.min(0) ]],
  })
  */
  isValidField( field: string ): boolean | null {
    return this.validatorsService.isValidField( this.myForm, field );
  }

  getError( field: string): string | null {
    if ( !this.myForm.controls[field] ) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {

      switch(key) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Minimo ${errors['minlength'].requiredLength } caracteres`;
      }
    }
    return ''
  }

  onSave(): void {

    if ( this.myForm.invalid) {
      this.myForm.markAsTouched;
      return;
    };

    this.myForm.reset({ price: 0, inStorage: 0 }); // los campos del formulario, todos se van a resetear, no es necesario pasar cada elemento.
  }

}
