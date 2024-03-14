import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor ( private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.myForm.reset() // acá se podría iniciarliazar el contenido de los campos para mostrar en el formulario
  }

  public myForm: FormGroup = this.formBuilder.group({
    name: ['', [ Validators.required, Validators.minLength(3) ], ],
    price: [0, [ Validators.required, Validators.min(0)] ],
    inStorage: [0, [ Validators.required, Validators.min(0)] ],
  })

  isValidField( field: string ): boolean | null {
    return this.myForm.controls[field].getError('required') && this.myForm.controls[field].touched;

  }

  getError( field: string): string | null {
    if ( !this.myForm.controls[field] && !this.myForm.controls[field].errors ) return null;

    const errors = this.myForm.controls[field].errors || {};
    console.log(`fuera del for ${Object.keys(errors)}` )

    for (const key of Object.keys(errors)) {
      console.log(key)
    }
    return ''
  }

  onSave(): void {

    if ( this.myForm.invalid) {
      this.myForm.markAsTouched;
      return;
    };

    console.log(this.myForm.value);

    this.myForm.reset() // los campos del formulario, todos se van a resetear, no es necesario pasar cada elemento.
  }

}
