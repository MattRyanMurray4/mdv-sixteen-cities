import { Component, EventEmitter, Input, Output } from '@angular/core';
import { City } from '@city/api-interfaces';

@Component({
  selector: 'city-cities-list',
  templateUrl: './cities-list.component.html',
  styleUrls: ['./cities-list.component.scss'],
})
export class CitiesListComponent {
  @Input() cities: City[] | null;
  @Input() readonly = false;
  @Output() selected = new EventEmitter();
  @Output() deleted = new EventEmitter();
  @Output() cityViewed = new EventEmitter();
}
