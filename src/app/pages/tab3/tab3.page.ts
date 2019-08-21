import { DataLocalService } from 'src/app/services/data-local.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  sliderOpts = {
    allowSlidePrev: false,
    allowSlideNext: false
  };

  constructor( public datalocalService: DataLocalService) {}

  ngOnInit() {

  }
}
