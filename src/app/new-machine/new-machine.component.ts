import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {BackendService} from "../backend.service";

@Component({
  selector: 'app-new-machine',
  templateUrl: './new-machine.component.html',
  styleUrls: ['./new-machine.component.css']
})
export class NewMachineComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private backend: BackendService) {
    this.formGroup = this.formBuilder.group({
      name: ['',[Validators.required, Validators.minLength(4)]],
    })
  }

  ngOnInit(): void {
  }

  create(){
    let name = this.formGroup.get('name')?.value;
    this.backend.createMachine(name).subscribe( (response) => {
      this.router.navigate(['/machines']);
    })
  }

  back(){
    this.router.navigate(['/machines']);
  }
}
