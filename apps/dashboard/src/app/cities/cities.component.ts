import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { City, emptyCity } from '@city/api-interfaces';
import { CitiesFacade } from '@city/core-state';
import { Observable } from 'rxjs';

@Component({
  selector: 'city-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss'],
})
export class CitiesComponent implements OnInit {
  form: FormGroup;
  cities$: Observable<City[]> = this.citiesFacade.allCities$;
  selectedCity$: Observable<City> = this.citiesFacade.selectedCities$;

  constructor(
    private citiesFacade: CitiesFacade,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.initForm();
    this.citiesFacade.loadCities();
    this.reset();

    const cityRouteId = this.route.snapshot.params['id'];

    if (cityRouteId) {
      this.loadCity(cityRouteId);
    }
  }

  selectCity(city: City) {
    this.citiesFacade.selectCity(city.id);
    this.form.patchValue(city);
  }

  viewCity(cityId: string) {
    this.router.navigate(['cities', cityId]);
  }

  loadCity(cityId: string) {
    this.citiesFacade.selectCity(cityId);
    this.citiesFacade.loadCity(cityId);
  }

  reset() {
    this.selectCity(emptyCity);
    this.form.reset();
  }

  createCity(city: City) {
    this.citiesFacade.createCity(city);
    this.reset();
  }

  updateCity(city: City) {
    this.citiesFacade.updateCity(city);
    this.reset();
  }

  saveCity(city: City) {
    city.id
      ? this.citiesFacade.updateCity(city)
      : this.citiesFacade.createCity(city);
    this.reset();
  }

  deleteCity(city: City) {
    this.citiesFacade.deleteCity(city);
    this.reset();
  }

  cancel() {
    this.reset();
  }

  private initForm() {
    this.form = this.formBuilder.group({
      id: null,
      cityName: ['', Validators.required],
      location: ['', Validators.required],
      facts: ['', Validators.required],
      crimeRate: ['', Validators.required],
      touristAttraction: [''],
    });
  }
}
