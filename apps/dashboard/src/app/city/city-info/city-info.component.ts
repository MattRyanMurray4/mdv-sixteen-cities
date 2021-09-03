import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { City } from '@city/api-interfaces';
import { CitiesFacade } from '@city/core-state';

@Component({
  selector: 'city-city-info',
  templateUrl: './city-info.component.html',
  styleUrls: ['./city-info.component.scss'],
})
export class CityInfoComponent {
  @Input() city: City | null;

  constructor(
    private citiesFacade: CitiesFacade,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  navigateBack() {
    this.router.navigate(['/cities']);
  }
}
