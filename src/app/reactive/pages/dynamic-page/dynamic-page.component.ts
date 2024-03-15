import { Component } from '@angular/core';
import { Form, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/service/validators.service';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: [
  ]
})
export class DynamicPageComponent {

  constructor(
    private formBuilder: FormBuilder,
    private validatorsService: ValidatorsService,
     ){}


  public myForm: FormGroup = this.formBuilder.group({
    name: ['', [ Validators.required, Validators.minLength(3) ]],
    favoriteGames: this.formBuilder.array([
      ['World of Warcraft', Validators.required ],
      ['King of fighters 97', Validators.required ]
    ])
  })

  public newFavorite: FormControl = new FormControl('', [ Validators.required, Validators.minLength(3)])


  get favoriteGames( ) {

    return this.myForm.get('favoriteGames') as FormArray;
  }

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

  isValidFieldInArray( formArray: FormArray, i: number) {

    return formArray.controls[i].errors && formArray.controls[i].touched;
  }

  onDeleteFavoriteGame( i: number):void {
    this.favoriteGames.removeAt(i)
  }

  onAddFavoriteGame(): void {
    if( this.newFavorite.invalid )return;

    const newGame = this.newFavorite.value;

    this.favoriteGames.push(
      this.formBuilder.control( newGame, Validators.required )
    );

    this.newFavorite.reset()

  }

  onSubmit(): void {

    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);

    (this.myForm.controls['favoriteGames'] as FormArray) = this.formBuilder.array([])
    this.myForm.reset();
  }

}
