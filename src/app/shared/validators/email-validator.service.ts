import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, delay, of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class EmailValidatorService implements AsyncValidator{


  // validate(control: AbstractControl): Observable<ValidationErrors | null> {

  //   const email = control.value;

  //   console.log(email);

  //   return of( {
  //     emailTaken: true,
  //   })
  // }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {

    const email = control.value;

    const httpCallObservable = new Observable< ValidationErrors | null >( ( subscriber) => {

      console.log({email})

      if( email === 'luis@luis.com') {
        subscriber.next( { emailTaken: true});
        subscriber.complete(); // con esto cerramos la suscripción, para que deje de emitir valores
        return;
      }

      subscriber.next(null);
      subscriber.complete();

    }).pipe(
      delay(2000),// hace que tenga una espera de 2 segundos
    )

    return httpCallObservable;
  }






}
