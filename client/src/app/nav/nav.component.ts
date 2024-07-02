import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, BsDropdownModule, RouterLink, RouterLinkActive, TitleCasePipe],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  accountService = inject(AccountService);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  model: any = {};

  login() {
    console.log(this.model)
    this.accountService.login(this.model).subscribe({
      next: _ => {
        void this.router.navigateByUrl('/members');
      },
      error: err => this.toastr.error(err.error),
      complete: () => { console.log('completed...') }
    })
  }

  logout() {
    this.model = {};
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

}
