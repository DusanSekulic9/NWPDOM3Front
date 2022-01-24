import { Component, OnInit } from '@angular/core';
import {Machine} from "../models/Machine";
import {User} from "../models/User";
import {BackendService} from "../backend.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-machines',
  templateUrl: './machines.component.html',
  styleUrls: ['./machines.component.css']
})
export class MachinesComponent implements OnInit {

  machines: Machine[] = [];
  loggedInUser: User = JSON.parse(localStorage.getItem('user') || '');
  formGroup: FormGroup;



  constructor(private backend: BackendService, private router: Router, private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      name: [''],
      status: [''],
      dateFrom: [''],
      dateTo: [''],
    })
  }


  ngOnInit(): void {
    this.backend.search("", "", "", "").subscribe( (response) =>{
      this.machines = response;
    }, error => {
      if(!this.loggedInUser.can_search_machines) {
        alert('You don\'t have permission to search machines');
      }
    })
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  createMachine(){
    this.router.navigate(['/createMachine']);
  }

  start(machine: Machine){
    let oldStatus = machine.status;
    machine.status = "WORKING...";
    this.backend.start(machine.id, machine.version).subscribe((response) => {
      for(let i = 0; i < this.machines.length; i++){
        if(this.machines[i].id === response.id){
          this.machines[i].version = response.version;
          this.machines[i].status = response.status;
          return
        }
      }
    }, error => {
      machine.status = oldStatus;
      alert(error.error);
    })
  }

  search(){
    let name = this.formGroup.get('name')?.value;
    let status = this.formGroup.get('status')?.value;
    let dateFrom = this.formGroup.get('dateFrom')?.value;
    let dateTo = this.formGroup.get('dateTo')?.value;
    this.backend.search(name, status, dateFrom, dateTo).subscribe( (response) =>{
      this.machines = response;
    })
  }


  restart(machine: Machine){
    let oldStatus = machine.status;
    machine.status = "WORKING...";
    this.backend.restart(machine.id, machine.version).subscribe((response) => {
      for(let i = 0; i < this.machines.length; i++){
        if(this.machines[i].id === response.id){
          this.machines[i].version = response.version;
          this.machines[i].status = response.status;
          return
        }
      }
    }, error => {
      machine.status = oldStatus;
      alert(error.error);
    })
  }


  stop(machine: Machine){
    let oldStatus = machine.status;
    machine.status = "WORKING...";
    this.backend.stop(machine.id, machine.version).subscribe((response) => {
      for(let i = 0; i < this.machines.length; i++){
        if(this.machines[i].id === response.id){
          this.machines[i].version = response.version;
          this.machines[i].status = response.status;
          return
        }
      }
    }, error => {
      machine.status = oldStatus;
      alert(error.error);
    })
  }


  destroy(machine: Machine){
    this.backend.destroy(machine.id, machine.version).subscribe((response) =>{
      this.machines.splice(this.machines.indexOf(machine), 1)
    }, error => {
      alert(error.error);
    })

  }

  schedule(machine: Machine){
    localStorage.setItem('machine', JSON.stringify(machine));
    this.router.navigate(['/schedule'])
  }

}
