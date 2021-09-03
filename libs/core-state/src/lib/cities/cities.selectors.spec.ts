import { CitiesEntity } from './cities.models';
import {
  citiesAdapter,
  CitiesPartialState,
  initialState,
} from './cities.reducer';
import * as CitiesSelectors from './cities.selectors';

describe('Cities Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getCitiesId = (it: CitiesEntity) => it.id;
  const createCitiesEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as CitiesEntity);

  let state: CitiesPartialState;

  beforeEach(() => {
    state = {
      cities: citiesAdapter.setAll(
        [
          createCitiesEntity('PRODUCT-AAA'),
          createCitiesEntity('PRODUCT-BBB'),
          createCitiesEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Cities Selectors', () => {
    it('getAllCities() should return the list of Cities', () => {
      const results = CitiesSelectors.getAllCities(state);
      const selId = getCitiesId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = CitiesSelectors.getSelected(state) as CitiesEntity;
      const selId = getCitiesId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getCitiesLoaded() should return the current "loaded" status', () => {
      const result = CitiesSelectors.getCitiesLoaded(state);

      expect(result).toBe(true);
    });

    it('getCitiesError() should return the current "error" state', () => {
      const result = CitiesSelectors.getCitiesError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
