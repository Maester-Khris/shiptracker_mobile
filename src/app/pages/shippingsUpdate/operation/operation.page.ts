import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-operation',
  templateUrl: './operation.page.html',
  styleUrls: ['./operation.page.scss'],
})
export class OperationPage implements OnInit {

  ship_reference="";

  constructor(private route:ActivatedRoute, private router:Router) {}

  ngOnInit() {
    if (this.router.getCurrentNavigation().extras.state) {
      this.ship_reference = this.router.getCurrentNavigation().extras.state['data'];
    }
  }

}
