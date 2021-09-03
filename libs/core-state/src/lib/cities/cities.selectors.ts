import { City, emptyCity } from '@city/api-interfaces';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  CITIES_FEATURE_KEY,
  CitiesState,
  citiesAdapter,
} from './cities.reducer';

// Lookup the 'Cities' feature state managed by NgRx
export const getCitiesState =
  createFeatureSelector<CitiesState>(CITIES_FEATURE_KEY);

const { selectAll, selectEntities } = citiesAdapter.getSelectors();

export const getCitiesLoaded = createSelector(
  getCitiesState,
  (state: CitiesState) => state.loaded
);

export const getCitiesError = createSelector(
  getCitiesState,
  (state: CitiesState) => state.error
);

export const getAllCities = createSelector(
  getCitiesState,
  (state: CitiesState) => selectAll(state)
);

export const getCitiesEntities = createSelector(
  getCitiesState,
  (state: CitiesState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getCitiesState,
  (state: CitiesState) => state.selectedId
);

export const getSelected = createSelector(
  getCitiesEntities,
  getSelectedId,
  (entities, selectedId) =>
    (selectedId ? entities[selectedId] : emptyCity) as City
);
