import { Component, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { SpotService } from 'src/app/services/spot.service';
import { Spot } from 'src/app/models/spot.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FavouriteSpot } from 'src/app/models/favourite-spot.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @Output() serverUserData!: any;
  @Output() spotData: Spot[] = [];
  @Output() favouriteSpotData: FavouriteSpot[] = [];
  
  constructor(private loginService: LoginService, private activated: ActivatedRoute) { }

  showDashboard: boolean = false;
  getUserInfoSub?: Subscription;
  getSpotsInfoSub?: Subscription;
  getFavouriteSpotsInfoSub? : Subscription;


  ngOnInit(): void {
  if(this.loginService.isLogged === true){

    //Show dashboard
    this.showDashboard = !this.showDashboard;


      //Get the user's data
      this.getUserInfoSub = this.loginService.getUser(this.loginService?.loggedUserId).subscribe(
      response => {
        this.serverUserData = response;
      }
    )

    //Get all spots data from the resolver
    this.getSpotsInfoSub = this.activated.data.subscribe(({ allSpots }) => {
      this.spotData = allSpots;
    })


    //Get all fav spots data from the resolver
    this.getFavouriteSpotsInfoSub = this.activated.data.subscribe(({ favSpots }) => {
      this.favouriteSpotData = favSpots;
    })

 
  }

  }


  
  ngOnDestroy(): void{
    this.getUserInfoSub?.unsubscribe();
    this.getSpotsInfoSub?.unsubscribe();
    this.getFavouriteSpotsInfoSub?.unsubscribe();
  }
 
 }


