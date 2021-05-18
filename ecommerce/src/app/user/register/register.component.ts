import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {



  constructor(private userService: UserService) { }

  public username: string = '';
  public password: string = '';
  ngOnInit(): void {
  }

  register() {
    this.userService.register(this.username, this.password).subscribe(resp => {
      alert("success");
    }, err => {
      alert("error")
    }
    )
  }

}
