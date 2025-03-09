import { AbstractControl, FormArray, FormGroup, ValidationErrors } from '@angular/forms';

async function sleep(){
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, 2500);
  })
}

export class FormUtils {
  static readonly namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static readonly emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static readonly notOnlySpacesPattern = '^[a-zA-Z0-9]+$';
  static readonly passwordPattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$';

  static isValidField(form: FormGroup, fieldName: string): boolean | null {
    return !!form.controls[fieldName].errors && form.controls[fieldName].touched;
  }

  static getTextError(errors: ValidationErrors){
    for( const key of Object.keys(errors)){
      switch(key) {
        case 'required':
          return 'Este campo es requerido'
        case 'minlength':
          return `Minimo de ${ errors['minlength'].requiredLength } caracteres.`
        case 'min':
          return `Valor minimo de ${ errors['min'].min }.`
        case 'email':
          return `El valor ingresado no es un correo electronico.`
        case 'emailTaken':
          return `El correo electronico ya existe.`
        case 'noStrider':
          return `El valor ingresado no puede contener la palabra "strider".`
        case 'pattern':
          if (errors['pattern'].requiredPattern === this.emailPattern) {
            return `El valor ingresado no luce con un correo electronico.`
          }
          return `Error de expresion regular.`
      }
    }

    return null;
  }

  static getFieldError(form: FormGroup, fieldName: string, message: string = ''): string | null {
    if (!form.controls[fieldName]) return null;

    const errors = form.controls[fieldName].errors ?? {};
    return this.getTextError(errors) ?? message;
  }

  static getFieldErrorInArray(formArray: FormArray, index: number): string | null {
    if (formArray.controls.length === 0) return null;

    const errors = formArray.controls[index].errors ?? {};
    return this.getTextError(errors);
  }

  static isValidFieldInArray( formArray: FormArray, index: number){
    return (
      formArray.controls[index].errors && formArray.controls[index].touched
    );
  }

  static isFieldOneEqualFieldTwo(field1: string, field2: string) {
    return ( formGroup: AbstractControl) => {
      const field1Value = formGroup.get(field1)?.value;
      const field2Value = formGroup.get(field2)?.value;

      return field1Value === field2Value ? null : { passwordsNotEqual: true };
    };
  }

  static async checkingServerResponse(control: AbstractControl): Promise<ValidationErrors | null> {
    console.log('Checking server response...');

    await sleep();

    const formValue = control.value;
    if( formValue === 'hola@mundo.com') {
      return {
        emailTaken: true };
    };

    return null;
  }

  static notStrider(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    return value.toLowerCase().includes('strider') ? { noStrider: true } : null;
  }
}
