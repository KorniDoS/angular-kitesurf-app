import { Directive, Input, Renderer2, ElementRef, HostListener } from '@angular/core';

import { Sort } from '../utils/sort';


@Directive({
  selector: '[tableSort]'
})
export class SortDirective {

  constructor(private renderer: Renderer2, private targetElement: ElementRef) { }
  
  @Input() tableSort!: Array<any>;
  @HostListener("click")
  sortData() {

    const sort = new Sort();

    const elem = this.targetElement.nativeElement;

    const order = elem.getAttribute("data-order");

    const property = elem.getAttribute("data-name");

    if (order === "desc") {
      this.tableSort.sort(sort.startSort(property, order));
      elem.setAttribute("data-order", "asc");
    } else {
      this.tableSort.sort(sort.startSort(property, order));
      elem.setAttribute("data-order", "desc");
    }

  }

}