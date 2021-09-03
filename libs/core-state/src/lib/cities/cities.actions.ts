import { City } from '@city/api-interfaces';
import { createAction, props } from '@ngrx/store';

export const init = createAction('[Cities Page] Init');

// all

export const loadCities = createAction('[Cities] Load All Cities');

export const loadCitiesSuccess = createAction(
  '[Cities] Load Cities Success',
  props<{ cities: City[] }>()
);

export const loadCitiesFailure = createAction(
  '[Cities] Load Cities Failure',
  props<{ error: any }>()
);

// single

export const loadCity = createAction(
  '[City] Load A City',
  props<{ cityId: string }>()
);

export const loadCitySuccess = createAction(
  '[City] Loaded City Success',
  props<{ city: City }>()
);

export const loadCityFailure = createAction(
  '[City] Loaded City Failure',
  props<{ error: any }>()
);

// select

export const selectCity = createAction(
  '[City] Selected A City',
  props<{ cityId: string }>()
);

// create

export const createCity = createAction(
  '[City] Create A City',
  props<{ city: City }>()
);

export const createCitySuccess = createAction(
  '[City] Created City Success',
  props<{ city: City }>()
);

export const createCityFailure = createAction(
  '[City] Created City Failure',
  props<{ error: any }>()
);

// update

export const updateCity = createAction(
  '[City] Update A City',
  props<{ city: City }>()
);

export const updateCitySuccess = createAction(
  '[City] Updated City Success',
  props<{ city: City }>()
);

export const updateCityFailure = createAction(
  '[City] Updated City Failure',
  props<{ error: any }>()
);

// delete

export const deleteCity = createAction(
  '[City] Delete A City',
  props<{ city: City }>()
);

export const deleteCitySuccess = createAction(
  '[City] Deleted City Success',
  props<{ id: string }>()
);

export const deleteCityFailure = createAction(
  '[City] Deleted City Failure',
  props<{ error: any }>()
);
