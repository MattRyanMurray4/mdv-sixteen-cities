import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CitiesFacade } from '@city/core-state';

@Component({
  selector: 'city-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss'],
})
export class CityComponent implements OnInit {
  currentCity$ = this.citiesFacade.selectedCities$;

  constructor(
    private citiesFacade: CitiesFacade,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const cityId = this.route.snapshot.params.id;
    this.loadCity(cityId);
  }

  loadCity(cityId: string) {
    this.citiesFacade.selectCity(cityId);
    this.citiesFacade.loadCity(cityId);
  }

  navigateBack() {
    this.router.navigate(['/cities']);
  }
}
