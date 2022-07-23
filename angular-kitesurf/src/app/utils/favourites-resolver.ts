import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { SpotService } from "../services/spot.service";
import { Observable } from "rxjs";
import { FavouriteSpot } from "../models/favourite-spot.model";



@Injectable({
    providedIn: 'root'
})

export class FavouritesResolver implements Resolve<FavouriteSpot[]> {
    constructor(private spotService: SpotService) { }

    resolve(): Observable<FavouriteSpot[]> | Promise<FavouriteSpot[]> | FavouriteSpot[] {
        return this.spotService.getFavouriteSpots();
    }


}


