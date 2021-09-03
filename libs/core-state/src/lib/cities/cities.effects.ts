import {
  actionTypeNamePastTense,
  actionTypeNamePresentTense,
  CitiesService,
  getActionType,
  NotifyService,
} from '@city/core-data';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, tap, catchError, switchMap } from 'rxjs/operators';
import {
  loadCities,
  loadCitiesFailure,
  loadCitiesSuccess,
  loadCity,
  loadCityFailure,
  loadCitySuccess,
  createCity,
  createCityFailure,
  createCitySuccess,
  updateCity,
  updateCityFailure,
  updateCitySuccess,
  deleteCity,
  deleteCityFailure,
  deleteCitySuccess,
} from './cities.actions';
import { of } from 'rxjs';

@Injectable()
export class CitiesEffects {
  constructor(
    private readonly actions$: Actions,
    private citiesService: CitiesService,
    private notify: NotifyService
  ) {}
  loadCities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCities),
      switchMap(() =>
        this.citiesService.all().pipe(
          map((cities) => loadCitiesSuccess({ cities })),
          catchError((error) => of(loadCitiesFailure({ error })))
        )
      )
    )
  );
  loadCity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCity),
      switchMap(({ cityId }) =>
        this.citiesService.find(cityId).pipe(
          map((city) => loadCitySuccess({ city })),
          catchError((error) => of(loadCityFailure({ error })))
        )
      )
    )
  );

  createCity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createCity),
      switchMap(({ city }) =>
        this.citiesService.create(city).pipe(
          map((city) => createCitySuccess({ city })),
          catchError((error) => of(createCityFailure({ error })))
        )
      )
    )
  );
  updateCity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateCity),
      switchMap(({ city }) =>
        this.citiesService.update(city).pipe(
          map((city) => updateCitySuccess({ city })),
          catchError((error) => of(updateCityFailure({ error })))
        )
      )
    )
  );

  deleteCity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteCity),
      switchMap(({ city }) =>
        this.citiesService.delete(city.id).pipe(
          map((id) => deleteCitySuccess({ id })),
          catchError((error) => of(deleteCityFailure({ error })))
        )
      )
    )
  );

  citiesSuccessNotifications$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateCitySuccess, createCitySuccess, deleteCitySuccess),
        tap((action) => {
          const actionType = getActionType(action.type);
          this.notify.notification(
            `City ${actionTypeNamePastTense[actionType]} Successfully!`
          );
        })
      ),
    { dispatch: false }
  );

  citiesFailureNotifications$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateCityFailure, createCityFailure, deleteCityFailure),
        tap((action) => {
          const actionType = getActionType(action.type);
          this.notify.notification(
            `Failed to ${actionTypeNamePresentTense[actionType]} City. Please try again.`
          );
        })
      ),
    { dispatch: false }
  );
}
