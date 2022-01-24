import { Component, OnInit } from '@angular/core';
import {BackendService} from "../backend.service";
import {Error} from "../models/Error";

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.css']
})
export class ErrorsComponent implements OnInit {

  errors: Error[] = [];

  constructor(private backend: BackendService) { }

  ngOnInit(): void {
    this.backend.errors().subscribe( (response) =>{
      this.errors = response;
    })
  }

}
