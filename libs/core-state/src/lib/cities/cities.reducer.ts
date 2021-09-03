import { City } from '@city/api-interfaces';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as CitiesActions from './cities.actions';

export const CITIES_FEATURE_KEY = 'cities';

export interface CitiesAction extends Action {
  error: string;
}

export interface CitiesState extends EntityState<City> {
  selectedId?: string | number; // which Cities record has been selected
  loaded: boolean; // has the Cities list been loaded
  error?: string | null; // last known error (if any)
}

export interface CitiesPartialState {
  readonly [CITIES_FEATURE_KEY]: CitiesState;
}

export const citiesAdapter: EntityAdapter<City> = createEntityAdapter<City>();

export const initialState: CitiesState = citiesAdapter.getInitialState({
  loaded: false,
});

const setLoading = (state: CitiesState) => ({
  ...state,
  loaded: false,
  error: null,
});

const setFailure = (state: CitiesState, { error }: CitiesAction) => ({
  ...state,
  error,
});

const _citiesReducer = createReducer(
  initialState,
  on(
    CitiesActions.loadCities,
    CitiesActions.loadCity,
    CitiesActions.createCity,
    CitiesActions.updateCity,
    CitiesActions.deleteCity,
    setLoading
  ),
  on(
    CitiesActions.loadCitiesFailure,
    CitiesActions.loadCityFailure,
    CitiesActions.createCityFailure,
    CitiesActions.updateCityFailure,
    CitiesActions.deleteCityFailure,
    setFailure
  ),
  on(CitiesActions.init, (state) => ({ ...state, loaded: false, error: null })),
  on(CitiesActions.loadCitiesSuccess, (state, { cities }) =>
    citiesAdapter.setAll(cities, { ...state, loaded: true })
  ),
  on(CitiesActions.loadCitiesFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(CitiesActions.selectCity, (state, { cityId }) => ({
    ...state,
    selectedId: cityId,
  })),
  on(CitiesActions.loadCitySuccess, (state, { city }) =>
    citiesAdapter.upsertOne(city, { ...state, loaded: true })
  ),
  on(CitiesActions.createCitySuccess, (state, { city }) =>
    citiesAdapter.addOne(city, { ...state, loaded: true })
  ),
  on(CitiesActions.updateCitySuccess, (state, { city: { id, ...restCity } }) =>
    citiesAdapter.updateOne(
      { id, changes: { ...restCity } },
      { ...state, loaded: true }
    )
  ),
  on(CitiesActions.deleteCitySuccess, (state, { id }) =>
    citiesAdapter.removeOne(id, { ...state, loaded: true })
  )
);

export function citiesReducer(state: CitiesState | undefined, action: Action) {
  return _citiesReducer(state, action);
}
