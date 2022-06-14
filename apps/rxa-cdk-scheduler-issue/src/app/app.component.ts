import { Component } from '@angular/core';
import { timer } from '@rx-angular/cdk/zone-less/rxjs';

@Component({
  selector: 'rxa-cdk-scheduler-issue-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'rxa-cdk-scheduler-issue';

  constructor() {
    // timer behaves properly but not in unit test that uses RxJS schedulers
    timer(2000).subscribe(value => console.log('DEBUG:: value =', value));
  }
}
