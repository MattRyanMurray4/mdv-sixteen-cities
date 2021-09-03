import { ActionReducerMap } from '@ngrx/store';
import {
  citiesReducer,
  CitiesState,
  CITIES_FEATURE_KEY,
} from './cities/cities.reducer';

export interface AppState {
  [CITIES_FEATURE_KEY]: CitiesState;
}

export const reducers: ActionReducerMap<AppState> = {
  [CITIES_FEATURE_KEY]: citiesReducer,
};
