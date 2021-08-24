import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/account/auth-service';
import { IPagination } from 'src/app/core/interfaces/pagination-interfaces';
import { ICommonParams } from 'src/app/core/interfaces/params-interfaces';
import { IProvider } from 'src/app/core/interfaces/providers-interfaces';
import { NotificationService } from 'src/app/core/services/notification-service';
import { ProviderApiService } from 'src/app/core/services/provider-api.service';
import { PaginationComponent } from '../../layout/pagination/pagination.component';

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

  editItem(provider: IProvider) {
    if (this.editProvider == null) {
      this.editProvider = Object.assign({}, provider);
      this.editForm = true;
    }
  }

  submitEdit(newName: string) {
    this.editForm = false;

    if (newName) {
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
