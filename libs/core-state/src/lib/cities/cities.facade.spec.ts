import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';

import * as CitiesActions from './cities.actions';
import { CitiesEffects } from './cities.effects';
import { CitiesFacade } from './cities.facade';
import { CitiesEntity } from './cities.models';
import {
  CITIES_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './cities.reducer';
import * as CitiesSelectors from './cities.selectors';

interface TestSchema {
  cities: State;
}

describe('CitiesFacade', () => {
  let facade: CitiesFacade;
  let store: Store<TestSchema>;
  const createCitiesEntity = (id: string, name = ''): CitiesEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(CITIES_FEATURE_KEY, reducer),
          EffectsModule.forFeature([CitiesEffects]),
        ],
        providers: [CitiesFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(CitiesFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allCities$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allCities$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadCitiesSuccess` to manually update list
     */
    it('allCities$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allCities$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        CitiesActions.loadCitiesSuccess({
          cities: [createCitiesEntity('AAA'), createCitiesEntity('BBB')],
        })
      );

      list = await readFirst(facade.allCities$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
