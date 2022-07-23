import { Component, ElementRef, Input, Output, Renderer2, AfterViewInit, OnInit } from '@angular/core';
import { Spot } from 'src/app/models/spot.model';
import { FavouriteSpot } from 'src/app/models/favourite-spot.model';
@Component({
  selector: 'app-spot-table',
  templateUrl: './spot-table.component.html',
  styleUrls: ['./spot-table.component.scss']
})
export class SpotTableComponent implements AfterViewInit, OnInit {

  constructor(private renderer: Renderer2, private element: ElementRef) { }

  @Input() tableSpotData: Spot[] = [];
  @Input() favouriteSpotData: FavouriteSpot[] = [];
  searchTerm: string = '';


  ngOnInit(): void {

  }

  search(value: string): void {
    this.tableSpotData.filter((val) =>
      val?.name?.toLowerCase().includes(value))
  }


  markFavouriteSpotsRows() {
    //We assign a class: spot-{{spot.id}} for each table row in the template
    //We then check for the corresponding ids and apply the favourite class as needed
    this.tableSpotData.forEach((spot: any) => {
      this.favouriteSpotData.forEach((fav: FavouriteSpot) => {
        const tr = this.element.nativeElement.querySelector(`.spot-${CSS.escape(spot.id)}`)

        if (spot.id == fav.spot) {
          tr?.classList.add('favourite');
        }
      })

    });

  }




  ngAfterViewInit() {
    this.markFavouriteSpotsRows();
  }


}

