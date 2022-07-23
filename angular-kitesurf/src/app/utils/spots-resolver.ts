import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Spot } from "../models/spot.model";
import { SpotService } from "../services/spot.service";
import { Observable } from "rxjs";



@Injectable({ 
    providedIn: 'root' 
})

export class SpotsResolver implements Resolve<Spot[]> {
  constructor(private spotService: SpotService) {}


  resolve(): Observable<Spot[]>|Promise<Spot[]>|Spot[] {
    return this.spotService.getAllSpots();
  }



}