import { Component, OnInit, NgZone } from '@angular/core';
import intlTelInput from 'intl-tel-input';

@Component({
  selector: 'app-telephone',
  templateUrl: './telephone.component.html',
  styleUrls: ['./telephone.component.css'],
})
export class TelephoneComponent implements OnInit {
  phoneNumber: string = '';
  countryCode: string = '';
  iti: any;
  numberWithCode: string = '';

  constructor(private ngZone: NgZone) {}

  ngOnInit() {
    const inputElement = document.querySelector('#phone') as HTMLInputElement;
    if (inputElement) {
      this.iti = intlTelInput(inputElement, {
        initialCountry: 'us',
        separateDialCode: true,
        utilsScript:
          'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js',
      });

      inputElement.addEventListener('input', () => {
        this.ngZone.run(() => {
          this.updatePhoneNumber(inputElement.value);
        });
      });

      inputElement.addEventListener('countrychange', () => {
        this.ngZone.run(() => {
          this.updatePhoneNumber(inputElement.value);
        });
      });
    }
  }

  updatePhoneNumber(inputValue: string) {
    if (this.iti) {
      this.countryCode = '+' + this.iti.getSelectedCountryData().dialCode;
      this.phoneNumber = inputValue;
      this.numberWithCode = `${this.countryCode} ${this.phoneNumber}`.trim();

      console.log('Number with code:', this.numberWithCode);
    }
  }

  title = 'intlInputNew';
}
