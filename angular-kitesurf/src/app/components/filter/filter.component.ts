import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  constructor(private mapService: MapService) { }

  @Input() isToggled?: boolean;

  @Output() onChange = new EventEmitter();


  ngOnInit(): void {
  }

  filters: any = {
    country: '',
    wind: ''
  }


  showContainer(): void {
    this.isToggled = !this.isToggled;
  }


  sendFilters(event: any): void {
    this.mapService.filtersData = this.filters;
    this.onChange.emit(event);
  }
}
