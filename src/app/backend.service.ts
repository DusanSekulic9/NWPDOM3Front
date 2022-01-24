import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {Observable} from "rxjs";
import {User} from "./models/User";
import {Machine} from "./models/Machine";
import {Error} from "./models/Error";


@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private readonly api = environment.APIendpoint;
  private readonly loginApi = environment.LoginEndpoint;

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): Observable<any>{
    return this.http.post<any>(this.loginApi, {
      username: username,
      password: password
    },{observe: 'response' as 'response'})
  }

  getAllUsers(){
    return this.http.get<User[]>(this.api, {observe: 'response' as 'response'});
  }

  delete(user: number){
    return this.http.post<User>(this.api+'/delete', {
      username: user
    })
  }

  update(username: string, name: string, surname: string, create: boolean, read: boolean, update:boolean, del:boolean, create_m: boolean,
         destroy_m: boolean,search_m: boolean,start_m: boolean,restart_m: boolean,stop_m: boolean){
    return this.http.put<User>(this.api, {
      username: username,
      name: name,
      password: 'dummy',
      surname: surname,
      can_create_users: create,
      can_read_users: read,
      can_update_users: update,
      can_delete_users: del,
      can_create_machines: create_m,
      can_destroy_machines: destroy_m,
      can_search_machines: search_m,
      can_start_machines: start_m,
      can_restart_machines: restart_m,
      can_stop_machines: stop_m,
    })
  }

  create(username: string, password: string, name: string, surname: string, create: boolean, read: boolean, update:boolean, del:boolean,
    create_m: boolean, destroy_m: boolean,search_m: boolean,start_m: boolean,restart_m: boolean,stop_m: boolean){
    return this.http.post<User>(this.api, {
      username: username,
      password: password,
      name: name,
      surname: surname,
      can_create_users: create,
      can_read_users: read,
      can_update_users: update,
      can_delete_users: del,
      can_create_machines: create_m,
      can_destroy_machines: destroy_m,
      can_search_machines: search_m,
      can_start_machines: start_m,
      can_restart_machines: restart_m,
      can_stop_machines: stop_m,
    })
  }

  search(name: string, status: string, dateFrom: string, dateTo: string){
    return this.http.post<Machine[]>(this.api + '/machines/search', {
      name: name,
      status: status,
      dateFrom: dateFrom,
      dateTo: dateTo
    })
  }

  destroy(id: number, version: number){
    return this.http.post<Machine>(this.api + '/machines/delete', {
      id: id,
      version: version
    })
  }

  createMachine(name: string){
    return this.http.post(this.api + '/machines/create', {
      name: name
    })
  }

  start(id: number, version: number){
    return this.http.post<Machine>(this.api + '/machines/start', {
      id: id,
      version: version
    })
  }

  restart(id: number, version: number){
    return this.http.post<Machine>(this.api + '/machines/restart', {
      id: id,
      version: version
    })
  }

  stop(id: number, version: number){
    return this.http.post<Machine>(this.api + '/machines/stop', {
      id: id,
      version: version
    })
  }

  errors(){
    return this.http.get<Error[]>(this.api + '/machines/errors');
  }

  schedule(id: number, operation: string, date: string): Observable<any>{
    return this.http.post<any>(this.api + '/machines/reserve', {
      id: id,
      name: operation,
      date: date
    }, {observe: 'response' as 'response'})
  }

}
