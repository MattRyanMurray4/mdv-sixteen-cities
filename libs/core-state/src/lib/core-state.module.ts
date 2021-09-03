import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { RootStoreConfig, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from '.';
import { CitiesEffects } from './cities/cities.effects';
import { CitiesFacade } from './cities/cities.facade';

const storeConfig: RootStoreConfig<any> = {
  runtimeChecks: {
    strictActionImmutability: true,
    strictStateImmutability: true,
  },
};

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers, storeConfig),
    EffectsModule.forRoot([CitiesEffects]),
    StoreDevtoolsModule.instrument({ name: 'Cities-App' }),
  ],
  providers: [CitiesFacade],
})
export class CoreStateModule {}
