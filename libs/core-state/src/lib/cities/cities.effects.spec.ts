import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import { Observable } from 'rxjs';

import * as CitiesActions from './cities.actions';
import { CitiesEffects } from './cities.effects';

describe('CitiesEffects', () => {
  let actions: Observable<Action>;
  let effects: CitiesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        CitiesEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(CitiesEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: CitiesActions.init() });

      const expected = hot('-a-|', {
        a: CitiesActions.loadCitiesSuccess({ cities: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
