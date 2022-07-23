import { ApplicationRef, Injectable, Injector } from '@angular/core';
import { ComponentFactoryResolver } from '@angular/core';
import { SpotComponent } from '../components/spot/spot.component';
import { SpotService } from './spot.service';
import { FavouriteSpot } from '../models/favourite-spot.model';
import * as L from 'leaflet';



@Injectable({
  providedIn: 'root'
})




export class MapService {
  constructor(
    private spotService: SpotService,
    private resolver: ComponentFactoryResolver,
    private appRef: ApplicationRef, // appRef, used to attach the popup to the application's view.
    private injector: Injector//  Injector is a class that allows you to create components with dependencies on other classes or objects.
  ) {

  }


  filtersData: any;

  favouriteSpots: FavouriteSpot[] = [];


  public compilePopup(component: any, onAttach: any): any {

    //Create component factory resolver object
    const compFactory: any = this.resolver.resolveComponentFactory(component);

    //creates an instance of our new component using the compFactory object and assigns to compRef
    let compRef: any = compFactory.create(this.injector);

    /*if there is an onAttach function assigned to our new component, 
    then it will call that function when it attaches itself onto its host view (the appRef)*/
    if (onAttach) onAttach(compRef);
    this.appRef.attachView(compRef.hostView);

    compRef.onDestroy(() => this.appRef.detachView(compRef.hostView));


    let div = document.createElement('div');
    div.appendChild(compRef.location.nativeElement);
    return div;
  }


  //Create spots function
  createSpots(map: L.Map, allSpots: any[], favSpots: any[]): void {
    //Custom icons
    let PinIcon: any = L.Icon.extend({
      options: {
        iconSize: [38, 45],
        iconAnchor: [19, 45],
        popupAnchor: [99, 250]
      }
    });


    var redIcon = new PinIcon(
      {
        iconUrl: 'assets/images/red-map-pin.png'
      })

    var yellowIcon = new PinIcon(
      {
        iconUrl: 'assets/images/yellow-map-pin.png',
        className: 'yellow-marker'
      }
    )


    for (const spot of allSpots) {
      const id = spot.id;
      const name = spot.name;
      const country = spot.country;
      const wind = spot.probability;
      const month = spot.month;
      const lat = spot.lat;
      const long = spot.long;

      if (favSpots.find(favSpot => favSpot.spot == id)) {

        //Use yellow pin
        const marker = L.marker([lat, long], {
          icon: yellowIcon
        }).addTo(map);


        //Create Spot component and asign values to it
        let markerPopup: any = this.compilePopup(SpotComponent,
          (c: any) => {
              c.instance.spotId = id,
              c.instance.spotName = name,
              c.instance.spotCountry = country,
              c.instance.spotWind = wind,
              c.instance.spotLat = lat,
              c.instance.spotLong = long,
              c.instance.spotMonth = month
              c.instance.isFavourite = true;

          });


        marker.bindPopup(markerPopup);


      } else {

        //Otherwise, use the red pin
        const marker = L.marker([lat, long], {
          icon: redIcon
        }).addTo(map);


        let markerPopup: any = this.compilePopup(SpotComponent,
          (c: any) => {
              c.instance.spotId = id,
              c.instance.spotName = name,
              c.instance.spotCountry = country,
              c.instance.spotWind = wind,
              c.instance.spotLat = lat,
              c.instance.spotLong = long,
              c.instance.spotMonth = month
              c.instance.isFavourite = false;

          });
        marker.bindPopup(markerPopup);
      }
    }

  }

  /*
    currentList: any[] = [];
    filterSpots(map: L.Map, allSpots: any[], favSpots: any[]): void{
    
      map.eachLayer(layer=>{
        if(layer instanceof L.marker) {
          map.removeLayer(layer)
        };
      })
  
      this.currentList = allSpots.filter(
        list => list.country == this.filtersData.country
      );
      this.createSpots(map, this.currentList, favSpots);
    }
  */
}
