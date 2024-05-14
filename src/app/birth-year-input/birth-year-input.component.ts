import { Component, forwardRef, Input, input } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validator,
  Validators
} from '@angular/forms';
import {FormControlValidationDirective} from "../form-control-validation.directive";

@Component({
  selector: 'pr-birth-year-input',
  standalone: true,
  imports: [ReactiveFormsModule, FormControlValidationDirective],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BirthYearInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => BirthYearInputComponent),
      multi: true
    }
  ],
  templateUrl: './birth-year-input.component.html',
  styleUrl: './birth-year-input.component.css'
})
export class BirthYearInputComponent implements ControlValueAccessor, Validator {
  @Input({ required: true }) inputId!: string;
  year: number | null = null;

  birthYearCtrl = this.fb.control<number | null>(null, Validators.required);

  onChange: (value: number | null) => void = () => {};
  onTouched: () => void = () => {};

  constructor(private fb: NonNullableFormBuilder) {
    const firstTwoDigitsOfTheCurrentYear = Math.floor(new Date().getFullYear() / 100);

    this.birthYearCtrl.valueChanges.subscribe(value => {
      if (value === null || value <= 0) {
        this.year = null;
      } else if (value > 100) {
        this.year = value;
      } else if (value > new Date().getFullYear() % 100) {
        this.year = (firstTwoDigitsOfTheCurrentYear - 1) * 100 + value;
      } else {
        this.year = firstTwoDigitsOfTheCurrentYear * 100 + value;
      }

      this.onChange(this.year);
    });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  registerOnValidatorChange(fn: () => void): void {}

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.birthYearCtrl.disable();
    } else {
      this.birthYearCtrl.enable();
    }
  }

  validate(): ValidationErrors | null {
    if (this.year === null) {
      return null;
    } else if (this.year < 1900 || this.year > new Date().getFullYear()) {
      return { invalidYear: true };
    }

    return null;
  }

  writeValue(obj: any): void {
    // this.birthYearCtrl.setValue(obj.value, { emitEvent: false });
  }
}
