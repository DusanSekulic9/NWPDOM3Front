import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BackendService} from "../backend.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  userGroup: FormGroup;

  constructor(private http: BackendService, private router: Router, private formBuilder: FormBuilder) {
    this.userGroup = this.formBuilder.group({
      username: ['',[Validators.required, Validators.minLength(4)]],
      name: ['',[Validators.required, Validators.minLength(4)]],
      surname: ['',[Validators.required, Validators.minLength(4)]],
      read: [false],
      create: [false],
      update: [false],
      delete: [false],
      create_m: [false],
      destroy_m: [false],
      search_m: [false],
      start_m: [false],
      restart_m: [false],
      stop_m: [false],
    })

  }

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('editUser') || '')
    this.userGroup.get('username')?.setValue(user.email);
    this.userGroup.get('name')?.setValue(user.name);
    this.userGroup.get('surname')?.setValue(user.surname);
    this.userGroup.get('read')?.setValue(user.can_read_users);
    this.userGroup.get('create')?.setValue(user.can_create_users);
    this.userGroup.get('update')?.setValue(user.can_update_users);
    this.userGroup.get('delete')?.setValue(user.can_delete_users);
    this.userGroup.get('create_m')?.setValue(user.can_create_machines);
    this.userGroup.get('destroy_m')?.setValue(user.can_destroy_machines);
    this.userGroup.get('search_m')?.setValue(user.can_search_machines);
    this.userGroup.get('start_m')?.setValue(user.can_start_machines);
    this.userGroup.get('restart_m')?.setValue(user.can_restart_machines);
    this.userGroup.get('stop_m')?.setValue(user.can_stop_machines);
  }

  update(){
    let username = this.userGroup.get('username')?.value;
    let name = this.userGroup.get('name')?.value;
    let surname = this.userGroup.get('surname')?.value;
    let read = this.userGroup.get('read')?.value;
    let create = this.userGroup.get('create')?.value;
    let update = this.userGroup.get('update')?.value;
    let del = this.userGroup.get('delete')?.value;
    let create_m = this.userGroup.get('create_m')?.value;
    let destroy_m = this.userGroup.get('destroy_m')?.value;
    let search_m = this.userGroup.get('search_m')?.value;
    let start_m = this.userGroup.get('start_m')?.value;
    let restart_m = this.userGroup.get('restart_m')?.value;
    let stop_m = this.userGroup.get('stop_m')?.value;
    this.http.update(username, name, surname, create,read,update,del, create_m, destroy_m,search_m,start_m,restart_m,stop_m).subscribe((response) =>{
      localStorage.removeItem('editUser');
      this.router.navigate(['/home'])
    })
  }

  back(){
    localStorage.removeItem('editUser');
    this.router.navigate(['/home']);
  }


}
