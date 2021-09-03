import { Action } from '@ngrx/store';

import * as CitiesActions from './cities.actions';
import { CitiesEntity } from './cities.models';
import { State, initialState, reducer } from './cities.reducer';

describe('Cities Reducer', () => {
  const createCitiesEntity = (id: string, name = ''): CitiesEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Cities actions', () => {
    it('loadCitiesSuccess should return the list of known Cities', () => {
      const cities = [
        createCitiesEntity('PRODUCT-AAA'),
        createCitiesEntity('PRODUCT-zzz'),
      ];
      const action = CitiesActions.loadCitiesSuccess({ cities });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
