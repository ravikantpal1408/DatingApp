import { Component, OnInit, inject } from '@angular/core';
import { RegisterComponent } from "../register/register.component";
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [RegisterComponent]
})
export class HomeComponent implements OnInit {
  http = inject(HttpClient);
  private toastr = inject(ToastrService);
  registerMode = false;
  users: any;

  ngOnInit(): void {
    this.getUsers();
  }

  registerModeToggle() {
    this.registerMode = !this.registerMode;
  }

  cancelRegisterMode(event: boolean) {
    this.registerMode = event
  }

  getUsers() {
    this.http.get("https://localhost:5001/api/users").subscribe({
      next: res => { this.users = res },
      error: error => this.toastr.error(error.error),
      complete: () => { console.log("the request is completed") }
    })
  }

}
