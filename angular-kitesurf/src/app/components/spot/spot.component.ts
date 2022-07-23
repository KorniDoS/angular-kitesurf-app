import { Component, Input, OnInit } from '@angular/core';
import { SpotService } from 'src/app/services/spot.service';
import { Spot } from 'src/app/models/spot.model';
import { FavouriteSpot } from 'src/app/models/favourite-spot.model';
@Component({
  selector: 'app-spot',
  templateUrl: './spot.component.html',
  styleUrls: ['./spot.component.scss']
})
export class SpotComponent implements OnInit {
  //Data is provided in the map.service.ts createSpots method
  @Input() spotId? : number
  @Input() spotName? : string;
  @Input() spotCountry? : string
  @Input() spotWind? : string
  @Input() spotLat? : string
  @Input() spotLong? : string
  @Input() spotMonth? : string
  @Input() isFavourite?: boolean;
  constructor(private spotService: SpotService) { }


  favouriteSpot: FavouriteSpot={
    createdAt: undefined,
    spot: undefined,
    id: undefined
  };


  castToNumber(lat_long?: string): number{
    return Number(lat_long);
  }

  addSpotToFavourites(): void{
    //console.log(id);
    this.isFavourite = !this.isFavourite;
    this.favouriteSpot.createdAt = new Date();
    this.favouriteSpot.spot = this.spotId;

    this.spotService.addSpotToFavourites(this.favouriteSpot).subscribe(
      res=>{
        console.log(res);
        console.log('Succes');
      }
    );

    
  }

  removeSpotFromFavourites(spotId?: number): void{
    this.isFavourite = !this.isFavourite;

    this.spotService.removeSpotFromFavourites(spotId).subscribe(
      res=>{
        console.log('Succesfully removed from favourites!');
        console.log(res);
      }
    )
  }


  ngOnInit(): void {
 
  }



}
