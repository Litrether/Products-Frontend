import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Sanitizer, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/account/auth-service';
import { IPagination } from 'src/app/core/interfaces/pagination-interfaces';
import { ICommonParams } from 'src/app/core/interfaces/params-interfaces';
import { IProvider } from 'src/app/core/interfaces/providers-interfaces';
import { NotificationService } from 'src/app/core/services/notification-service';
import { ProviderApiService } from 'src/app/core/services/provider-api.service';

@Component({
  selector: 'app-providers-page',
  templateUrl: './providers-page.component.html',
  styleUrls: ['./providers-page.component.css']
})
export class ProvidersPageComponent implements OnInit {
  isLoaded: boolean = false;
  metaData: IPagination = {
    CurrentPage: 1,
    TotalPages: 1,
  }

  createForm: boolean = false;
  editForm: boolean = false;

  editProvider: IProvider;

  providers: IProvider[] = [];
  public params: ICommonParams = {
    pageNumber: 1,
  }

  public currentLocation: string = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2245.0599144050398!2d37.633201316046446!3d55.75746139909995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54bc6463a7e1f%3A0xd68e89e31b1d749d!2sUnderdog!5e0!3m2!1sru!2sby!4v1629892468792!5m2!1sru!2sby"

  constructor(private router: Router,
    public authService: AuthService,
    private notice: NotificationService,
    private providerService: ProviderApiService) {
    document.body.style.backgroundImage = "url('assets/img/manage-bg.jpg')";
  }

  ngOnInit() { }

  query(pageNumber: number = 1, reset: boolean = false): any {
    this.isLoaded = false;
    this.providerService.GetAllProviders(this.params).subscribe((data: any) => {
      this.providers = data.body;
      this.isLoaded = true;
      this.metaData = JSON.parse(data.headers.get('pagination'));
    })
  }

  onPageChange(pageNumber: number = 1) {
    this.metaData.CurrentPage = pageNumber;
    this.query();
  }
  search() {
    this.params.searchTerm = (<HTMLInputElement>(document.getElementById('search-input'))).value;
    this.onPageChange();
  }

  orderBy(orderBy: string) {
    this.params.orderBy = orderBy;
    this.onPageChange();
  }

  addItem(name: string) {
    this.createForm = false;
    let newProvider: IProvider = {
      name: name
    }
    if (newProvider) {
      this.providerService.AddProvider(newProvider).subscribe((data: any) => {
        this.notice.textNotice(`Provider ${newProvider.name} successfully created.`)
        this.query();
      }, (error: HttpErrorResponse) => {
        this.notice.textNotice(`Something went wrong! Maybe name ${newProvider.name} is taken.`);
      })
    }
  }

  map(provider: IProvider) {
    console.log(provider.locationURl);

    if (provider.locationURl)
      this.currentLocation = provider.locationURl;
  }


  editItem(provider: IProvider) {
    if (this.editProvider == null) {
      this.editProvider = Object.assign({}, provider);
      this.editForm = true;
    }
  }

  submitEdit(newName: string) {
    this.editForm = false;

    if (newName && this.editProvider && this.editProvider.name != newName) {
      this.editProvider.name = newName;
      this.providerService.UpdateProvider(this.editProvider).subscribe((data: any) => {
        this.notice.textNotice(`Provider ${this.editProvider?.name} successfully updated.`)
        this.onPageChange();
      }, (error: HttpErrorResponse) => {
        this.notice.textNotice(`Something went wrong! Maybe name ${this.editProvider?.name} is taken.`);
      })
    }
  }

  deleteItem(provider: IProvider) {
    if (!confirm(`Are you sure want to delete ${provider.name}?`)) {
      return;
    }
    this.providerService.DeleteProvider(provider).subscribe(() => {
      this.notice.textNotice(`Provider ${this.editProvider?.name} successfully deleted.`);
      this.providers.splice(this.providers.indexOf(provider), 1);
    }, (error: HttpErrorResponse) => {
      this.notice.textNotice(`Something went wrong!`);
    })
  }

}
