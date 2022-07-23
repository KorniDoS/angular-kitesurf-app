import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Spot } from 'src/app/models/spot.model';
import { MapService } from 'src/app/services/map.service';
import { SpotComponent } from '../spot/spot.component';
import * as L from 'leaflet';
import { FavouriteSpot } from 'src/app/models/favourite-spot.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit, OnInit {

  private map: any;

  @Input() allSpots: Spot[] = [];
  @Input() favSpots: FavouriteSpot[] = [];

  receivedFilters: any;

  private initMap(): void {

    this.map = L.map('map', {
      center: [49.182, 15.205],
      zoom: 3
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }


  //Run the filter function whenever the user presses the apply filter button from the child component
  applyFilter(event: any): void {

    //Assign filter data sent from the filter component through service prop
    this.receivedFilters = this.mapService.filtersData;

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

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
      })



      //We first check if values are not null
    if (this.receivedFilters.country !== '' &&
      (this.receivedFilters.wind !== null || this.receivedFilters.wind !== '')
    ) {

      //Remove current map layer
      this.map.eachLayer((layer: any) => {
        layer.remove();
      });


      //Filter all spots
      //Spots have to meet 2 conditions to be shown: 
      //spot country name should include the filter
      //spot wind probability should be higher or equal to the filter
      const filteredArr = this.allSpots.filter((item: any) =>
        item.country.includes(this.receivedFilters.country)
        && item.probability >= this.receivedFilters.wind);

      //Add fresh tiles
      tiles.addTo(this.map);


      //For each spot meeting the filter criteria 
      filteredArr.forEach((spot: any) => {

        //Asign it's values to variables
        const id = spot.id;
        const name = spot.name;
        const country = spot.country;
        const wind = spot.probability;
        const month = spot.month;
        const lat = spot?.lat;
        const long = spot?.long;


        //If the current spot id is also equal to the one in favourites
        if (this.favSpots.find((favSpot: any) => favSpot.spot == id)) {

          //Use yellow pin
          const marker = L.marker([lat, long], {
            icon: yellowIcon
          }).addTo(this.map);


          //Create Spot component and asign values to it
          let markerPopup: any = this.mapService.compilePopup(SpotComponent,
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
          }).addTo(this.map);


          let markerPopup: any = this.mapService.compilePopup(SpotComponent,
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
      })


      //Otherwise, display the default map with all spots
    } else if (this.receivedFilters.country === '' &&
      (this.receivedFilters.wind === null || this.receivedFilters.wind === 0)) {

      this.map.eachLayer((layer: any) => {
        layer.remove();
      });

      tiles.addTo(this.map);

      //Create default spots again
      this.mapService.createSpots(this.map, this.allSpots, this.favSpots);


    }


  }


  constructor(private mapService: MapService) { }

  ngAfterViewInit(): void {
    this.initMap();
    this.mapService.createSpots(this.map, this.allSpots, this.favSpots);
  }


  ngOnInit(): void {

  }


}
