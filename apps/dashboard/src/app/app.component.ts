import { Component } from '@angular/core';

@Component({
  selector: 'city-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Cities-Application';
  links = [
    { path: '/', icon: 'home', title: 'Login' },
    { path: 'cities', icon: 'view_list', title: 'City-List' },
  ];
}
