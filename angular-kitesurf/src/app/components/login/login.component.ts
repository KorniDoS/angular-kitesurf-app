import { Component, OnInit, Output, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { LoginGetRequest } from 'src/app/models/login.model';
import { LoginService } from 'src/app/services/login.service';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { FormGroup, FormControl, NgModel } from '@angular/forms';
import { EncryptionDecriptionService } from 'src/app/services/encryption-decription.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  serverUserData?: any;


  loginInfo: LoginGetRequest = {
    username: '',
    password: ''
  }

  allUsersSub?: Subscription;
  specificUserSub?: Subscription;
  randomUserLoginSub?: Subscription;

  constructor(private loginService: LoginService, private router: Router, private encrDecr: EncryptionDecriptionService) { }


  ngOnInit(): void {


  }

  ngOnDestroy(): void {
    this.allUsersSub?.unsubscribe();
    this.specificUserSub?.unsubscribe();
    this.randomUserLoginSub?.unsubscribe();

  }


  onSubmit(): void {


    let foundUser: boolean = false;
    this.allUsersSub = this.loginService.getAllUsers().subscribe(
      (all_users: any) => {

        for (const user of all_users) {

          let decrypted = this.encrDecr.get('123456$#@$^@1ERF', this.loginInfo.password);
 
          //Registered users through the signup form
          if (user.name === this.loginInfo.username && user.password == decrypted) {

            foundUser = true;
    
            this.specificUserSub = this.loginService.getUser(Number(user.id)).subscribe(
              (specific_user: any) => {
             
                this.serverUserData = specific_user;
                this.loginService.loggedUserId = this.serverUserData.id;
                this.router.navigate(['/dashboard']);
                this.loginService.isLogged = true;
              }
            )


            //Existing users that don't have a password key in the API can log with a random password
          } else if (user.name === this.loginInfo.username){
            foundUser = true;
  
            this.specificUserSub = this.loginService.getUser(Number(user.id)).subscribe(
              (specific_user: any) => {
             
                this.serverUserData = specific_user;
                this.loginService.loggedUserId = this.serverUserData.id;
                this.router.navigate(['/dashboard']);
                this.loginService.isLogged = true;
              }
            )
          }

        }



        //If there is no such user, randomnly generate a user id
        if (foundUser === false) {
          this.randomUserLoginSub = this.loginService.loginUser().subscribe(
            random_user => {
              this.serverUserData = random_user;
              this.loginService.loggedUserId = this.serverUserData.userId;
              this.router.navigate(['/dashboard']);
              this.loginService.isLogged = true;
            }
          )
        }
        
      }
    )


  }



}
