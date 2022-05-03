import { Injectable }    from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';
import { emit } from 'process';

@Injectable()
export class LoginService {
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    private taURL: string = 'http://localhost:3000/deliverer/login/';

    constructor(private http: HttpClient) {}

    login(email: string, password: string) {
        let delivererCredentials = {
            'email': email,
            'password': password
        };

        return this.http.post<any>(this.taURL, delivererCredentials)
        .toPromise()
        .then(res => {
            return res
        })
        .catch(this.catch);
    }

    private catch(error: any): Promise<any> {
        console.error('Oops, something went wrong',error);

        return Promise.reject(error.error.failure || error.message || error);
    }
}