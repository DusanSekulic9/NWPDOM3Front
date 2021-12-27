import { Component, OnInit } from '@angular/core';
import {BackendService} from "../backend.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginGroup: FormGroup;

  constructor(private backend: BackendService, private router: Router, private formBuilder: FormBuilder) {
    this.loginGroup = this.formBuilder.group({
      username: ['',[Validators.required, Validators.minLength(4)]],
      password: ['',[Validators.required, Validators.minLength(4)]]
    })
  }

  ngOnInit(): void {
    localStorage.clear();
  }

  login(){
    let username = this.loginGroup.get('username')?.value;
    let password = this.loginGroup.get('password')?.value;
    this.backend.login(username, password).subscribe( (response) =>{
      console.log(response)
      if(response.ok == true){
        localStorage.setItem('jwt', response.headers.get('Authorization'))
        localStorage.setItem('user', JSON.stringify(response.body))
        this.router.navigate(['/home'])
        return;
      }
    }, error => {
      alert('Please try again!')
    })
  }

}
