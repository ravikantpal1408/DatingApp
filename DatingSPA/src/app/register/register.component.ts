import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AccountService } from '../services/account.service';
import { AlertifyService } from '../services/alertify.service';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // getting value from parent to child component
  @Input() valuesFromHome: any;

  // passing value from child to parent
  @Output() cancelRegister = new EventEmitter();

  bsConfig: Partial<BsDatepickerConfig>; // for setting up Bootstrap datepicker 

  // model: any = {};
  registerForm: FormGroup;


  ngOnInit() {
    this.createRegisterForm();
    this.bsConfig = {
      containerClass : 'theme-blue',
    };
    // this.registerForm = new FormGroup({
    //   username: new FormControl('', [Validators.required]),
    //   password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
    //   confirmPassword: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),

    // },
    //   this.passwordMatchValidator);
  }


  constructor(
    private service: AccountService,
    private alertify: AlertifyService,
    private fb: FormBuilder) {

  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      gender          : ['male'],
      knownAs         : ['', Validators.required],
      dateOfBirth     : [null, Validators.required],
      city            : ['', Validators.required],
      country         : ['', Validators.required],
      username        : ['', [Validators.required]],
      password        : ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword : ['', [Validators.required]]
    }, {
        validator: this.passwordMatchValidator
      }
    )
  }

  
  passwordMatchValidator(ctrl: FormGroup) {
    return ctrl.get('password').value === ctrl.get('confirmPassword').value ? null : { mismatch: true };
  }

  register() {
    console.log(this.registerForm.value);
    // this.service.registerService(this.model).subscribe((res: any) => {

    //   this.alertify.success('Registration Successfull');

    // },
    // error => {
    //   console.log('error');
    //   this.alertify.error(error);
    // });
  }

  cancel() {
    // console.log('cancel');
    this.cancelRegister.emit(false);
  }
}
