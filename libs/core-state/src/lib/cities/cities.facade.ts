import { Injectable } from '@angular/core';
import { City } from '@city/api-interfaces';
import { select, Store, Action } from '@ngrx/store';

import * as CitiesActions from './cities.actions';
import * as CitiesFeature from './cities.reducer';
import * as CitiesSelectors from './cities.selectors';

@Injectable()
export class CitiesFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(CitiesSelectors.getCitiesLoaded));
  allCities$ = this.store.pipe(select(CitiesSelectors.getAllCities));
  selectedCities$ = this.store.pipe(select(CitiesSelectors.getSelected));

  constructor(private readonly store: Store) {}
  init() {
    this.store.dispatch(CitiesActions.init());
  }

  loadCities() {
    return this.store.dispatch(CitiesActions.loadCities());
  }

  loadCity(cityId: string) {
    return this.store.dispatch(CitiesActions.loadCity({ cityId }));
  }

  selectCity(cityId: string) {
    return this.store.dispatch(CitiesActions.selectCity({ cityId }));
  }

  createCity(city: City) {
    return this.store.dispatch(CitiesActions.createCity({ city }));
  }

  updateCity(city: City) {
    return this.store.dispatch(CitiesActions.updateCity({ city }));
  }

  deleteCity(city: City) {
    return this.store.dispatch(CitiesActions.deleteCity({ city }));
  }

  private dispatch(action: Action) {
    return this.store.dispatch(action);
  }
}
