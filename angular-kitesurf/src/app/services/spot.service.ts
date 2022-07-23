import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Spot } from '../models/spot.model';
import { FavouriteSpot } from '../models/favourite-spot.model';

@Injectable({
  providedIn: 'root'
})
export class SpotService {
  apiBaseUrl = environment.apiBaseUrl;

  
  
  constructor(private http: HttpClient) { }

  getAllSpots():Observable<Spot[]>{
    return this.http.get<Spot[]>(this.apiBaseUrl + '/spot');
  }

  getFavouriteSpots():Observable<FavouriteSpot[]>{
    return this.http.get<FavouriteSpot[]>(this.apiBaseUrl + '/favourites');
  }

  addSpotToFavourites(spot: FavouriteSpot): Observable<Spot>{
    return this.http.post<Spot>(this.apiBaseUrl +'/favourites', spot);
  }

  removeSpotFromFavourites(id?: number): Observable<Spot>{
    return this.http.delete<Spot>(this.apiBaseUrl + '/spot/' + id );
  }

 

}
