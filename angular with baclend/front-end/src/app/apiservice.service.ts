import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs'; // only need to import from rxjs
@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private http: HttpClient) { }
    //connect front end to backend server


    apiUrl = 'http://localhost:3000/users';

    //fetch user data

    getAllData():Observable<any>
    {
      return this.http.get(`${this.apiUrl}`)
    }

    //create a new user
    createNewUser(user:any):Observable<any>
    {
      return this.http.post(`${this.apiUrl}` , user)
    }
    //delete user
    deleteUser(id:any):Observable<any>{
     let userid = id;
      return this.http.delete(`${this.apiUrl}/${userid}`)
    }
    //update data
    updateUser(newData:any,id:any):Observable<any>{
      let userid = id;
      return this.http.put(`${this.apiUrl}/${userid}` , newData)
    }
    //get single user
    getSimgleUser(id:any):Observable<any>{
      let userid = id;
      return this.http.get(`${this.apiUrl}/ ${userid}`)
    }
}
