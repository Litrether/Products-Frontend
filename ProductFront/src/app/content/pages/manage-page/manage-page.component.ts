import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-manage-page',
  templateUrl: './manage-page.component.html',
  styleUrls: ['./manage-page.component.css']
})
export class ManagePageComponent implements OnInit {

  currentPurpose: string = 'Categories';

  constructor() { }

  ngOnInit(): void {
  }

}
