import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SignupRequest } from 'src/app/models/signup-request.model';
import { EncryptionDecriptionService } from 'src/app/services/encryption-decription.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private signUpService: LoginService, private router: Router, private encrDecr: EncryptionDecriptionService) { }

  signUpSub?: Subscription;

  signUpInfo: SignupRequest={
    createdAt: new Date,
    name: '',
    avatar: '',
    email: '',
    password: ''
  }


  ngOnInit(): void {
  }

  signUp(): void{

    //Encrypt password
    let encrypted = this.encrDecr.set('123456$#@$^@1ERF', this.signUpInfo.password);

    //Assign encrypted password to the POST object
    this.signUpInfo.password = encrypted;

    this.signUpSub = this.signUpService.registerUser(this.signUpInfo).subscribe(
      res=>{
        alert('Succesfully registered!');
        setTimeout(()=>{
          this.router.navigate(['/login']);
        }, 2000);
      }
    );


  }

  ngOnDestroy(): void{
    this.signUpSub?.unsubscribe();
  }

}
