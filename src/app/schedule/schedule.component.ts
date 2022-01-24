import { Component, OnInit } from '@angular/core';
import {Machine} from "../models/Machine";
import {BackendService} from "../backend.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  machine: Machine = JSON.parse(localStorage.getItem('machine') || '');
  formGroup: FormGroup;

  constructor(private backend: BackendService, private router: Router, private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      date: [''],
    })

  }


  ngOnInit(): void {
  }

  schedule(){
    let operator = this.formGroup.get('name')?.value;
    let date = this.formGroup.get('date')?.value;
    this.backend.schedule(this.machine.id, operator, date).subscribe( (response) =>{
      console.log(response)
      if(response.ok){
        alert(response.body)
        this.router.navigate(['/machines']);
      }
    }, error => {
      console.log(error)
      alert(error.error);
    })

  }

  back(){
    localStorage.removeItem('machine');
    this.router.navigate(['/machines']);
  }

}
