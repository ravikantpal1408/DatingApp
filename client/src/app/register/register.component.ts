import { Component, EventEmitter, Output, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  // @Input() usersFromHomeComponent: any; // this what we used to do before 17.3
  // usersFromHomeComponent = input.required<any>(); // this is only available in 17.3+ version of angular
  // @Output() cancelRegister = new EventEmitter(); // old way of passing value from child to parent 
  cancelRegister = output<boolean>();// new way of doing only available for 17.3 & +
  accountService = inject(AccountService);
  model: any = {};

  register() {
    this.accountService.register(this.model).subscribe({
      next: res => {
        this.cancel();
      },
      error: err => console.log(err),
      complete: () => console.log('this request is now completed ... ')
    })
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
