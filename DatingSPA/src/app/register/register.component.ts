import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AccountService } from '../services/account.service';


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


  model: any = {};

  constructor(private service: AccountService) {}

  ngOnInit() {}

  register() {
    console.log(this.model);
    this.service.registerService(this.model).subscribe((res: any) => {
      console.log('success', res);
    },
    error => {
      console.log('error');
    });
  }

  cancel() {
    // console.log('cancel');
    this.cancelRegister.emit(false);
  }
}
