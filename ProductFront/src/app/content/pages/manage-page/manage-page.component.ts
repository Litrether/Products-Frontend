import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/core/account/auth-service';

@Component({
  selector: 'app-manage-page',
  templateUrl: './manage-page.component.html',
  styleUrls: ['./manage-page.component.css']
})
export class ManagePageComponent implements OnInit {

  currentPurpose: string = 'Categories';

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

}
