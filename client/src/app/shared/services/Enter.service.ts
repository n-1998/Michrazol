import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Http } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { User } from "../models/User"
import { debug } from 'util';
import { Subject } from 'rxjs';
import { observableToBeFn } from 'rxjs/testing/TestScheduler';
import { AuthService } from './auth.service';

@Injectable()
export class EnterService {

    user:User=new User();
    private ActiveUser:Subject<User>;

    constructor(private http: HttpClient,private authService:AuthService) { 
        this.ActiveUser=new Subject<User>();
    }

    updateConnectedUser() {
        this.user.UserId = Number(localStorage.getItem("userId"));
        if (this.user.UserId != 0) {
            this.user.FirstName = localStorage.getItem("userName");
            this.authService.loggedIn=true;
        }
        else{
            this.user.FirstName = "אורח";
            this.authService.loggedIn=false;
        }         
        this.ActiveUser.next(this.user);
    }
    getConnectedUser(): Observable<User> {
        return this.ActiveUser.asObservable();
    }
    login(password: string, email: string): Observable<User> {
        return this.http.get("http://localhost:52339/api/login/" + email + "/" + password)
            .map((response: User) => response)
            .catch((response: HttpErrorResponse) => Observable.throw(response));
    }

    addUser(newUser: User): Observable<Number> {
        return this.http.post("http://localhost:52339/api/register", newUser)
            .map((response: Number) => response)
            .catch((response: HttpErrorResponse) => Observable.throw(response));
    }

    forggotPassword(newUser: User): Observable<any> {
        return this.http.post("http://localhost:52339/api/forggotPassword", newUser)
            .map((response: any) => response)
            .catch((response: HttpErrorResponse) => Observable.throw(response));
    }
    checkExistEmail(user: User): Observable<boolean> {
        return this.http.post("http://localhost:52339/api/checkExistEmail", user)
            .map((response: boolean) => response)
            .catch((response: HttpErrorResponse) => Observable.throw(response));
    }
    checkEffectiveResetPassword(resetId: number): Observable<boolean> {
        return this.http.get("http://localhost:52339/api/checkEffectiveResetPassword/"+resetId)
            .map((response: boolean) => response)
            .catch((response: HttpErrorResponse) => Observable.throw(response));
    }
    resetPassword(user:User): Observable<boolean> {
        return this.http.post("http://localhost:52339/api/resetPassword", user)
            .map((response: boolean) => response)
            .catch((response: HttpErrorResponse) => Observable.throw(response));
    }
    getUserById(user:User):Observable<User>{
        return this.http.post("http://localhost:52339/api/getUserById",user)
        .map((response: User) => response)
        .catch((response: HttpErrorResponse) => Observable.throw(response));
    }
    updateUserDetails(user:User):Observable<boolean>{
        return this.http.post("http://localhost:52339/api/updateUserDetails",user)
        .map((response: boolean) => response)
        .catch((response: HttpErrorResponse) => Observable.throw(response));
    }
}
