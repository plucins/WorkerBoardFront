import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {InsuranceApplicaion} from '../models/insurance-applicaion.model';
import {ApplicationUser} from '../models/application-user.model';
import {UserRegisterService} from '../user-register/user-register.service';
import {Promise} from 'q';

@Injectable()
export class HomeService {

  user: ApplicationUser;

  constructor(private http: HttpClient, private userService: UserRegisterService) {
    this.user = this.userService.getUserObjet();
  }


  getUserApplication(): Promice<InsuranceApplicaion[]> {
    return this.http.get<InsuranceApplicaion[]>('http://localhost:8080/api/application/' + this.user.id + '/byUser').toPromise();
  }

  getDates(): Promice<any> {
    return this.http.get('http://localhost:8080/api/tools/dates').toPromise();
  }


}
