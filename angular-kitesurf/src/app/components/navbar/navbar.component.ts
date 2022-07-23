import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { User } from 'src/app/models/user.model';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() userData!: User;
  avatarToggle: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  logOutMenuPopup(): void{
    this.avatarToggle = !this.avatarToggle;
  }



}
