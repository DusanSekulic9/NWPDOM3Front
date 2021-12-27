import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {Observable} from "rxjs";
import {User} from "./models/User";

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

  update(username: string, password: string, name: string, surname: string, create: boolean, read: boolean, update:boolean, del:boolean){
    return this.http.put<User>(this.api, {
      username: username,
      password: password,
      name: name,
      surname: surname,
      can_create_users: create,
      can_read_users: read,
      can_update_users: update,
      can_delete_users: del,
    })
  }

  create(username: string, password: string, name: string, surname: string, create: boolean, read: boolean, update:boolean, del:boolean){
    return this.http.post<User>(this.api, {
      username: username,
      password: password,
      name: name,
      surname: surname,
      can_create_users: create,
      can_read_users: read,
      can_update_users: update,
      can_delete_users: del,
    })
  }

}
