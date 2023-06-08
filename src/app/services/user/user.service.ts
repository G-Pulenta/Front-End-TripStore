import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  registerUser(user: any) {
    return this.http.post(`${this.apiUrl}/users`, user);
  }

  loginUser(username: string, password: string) {
    return this.http.get(`${this.apiUrl}/users?username=${username}&password=${password}`);
  }

  getUser(userId: string) {
    return this.http.get(`${this.apiUrl}/users/${userId}`);
  }

  updateUser(user: any) {
    return this.http.put(`${this.apiUrl}/users/${user.id}`, user);
  }

  deleteUser(userId: string) {
    const url = `${this.apiUrl}/users/${userId}`;
    return this.http.delete(url);
  }
}
