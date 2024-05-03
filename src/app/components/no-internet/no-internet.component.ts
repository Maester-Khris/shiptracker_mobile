import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-internet',
  templateUrl: './no-internet.component.html',
  styleUrls: ['./no-internet.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NoInternetComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
