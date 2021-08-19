import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/account/auth-service';
import { IPagination } from 'src/app/core/interfaces/pagination-interfaces';
import { ICommonParams } from 'src/app/core/interfaces/params-interfaces';
import { IProvider } from 'src/app/core/interfaces/providers-interfaces';
import { NotificationService } from 'src/app/core/services/notification-service';
import { ProviderApiService } from 'src/app/core/services/provider-api.service';

@Component({
  selector: 'app-manage-provider-table',
  templateUrl: './manage-provider-table.component.html',
  styleUrls: ['./manage-provider-table.component.css']
})
export class ManageProviderTableComponent implements OnInit {
  providers: IProvider[] = [];
  pagination: IPagination;

  isLoad: boolean = false;
  createForm: boolean = false;
  editForm: boolean = false;
  editProvider: IProvider;

  public params: ICommonParams = {
    pageNumber: 1,
  }

  constructor(private router: Router,
    public authService: AuthService,
    private notice: NotificationService,
    private providerService: ProviderApiService) { }

  ngOnInit(): void {
    this.query();
  }

  query(): any {
    this.isLoad = false;
    this.providerService.GetAllProviders(this.params).subscribe((resp: any) => {
      this.providers = resp.body;
      this.isLoad = true;
    })
  }

  orderBy(orderBy: string) {
    this.params.orderBy = orderBy;
    this.query();
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
        this.notice.textNotice(`Something want wrong! Maybe name ${newProvider.name} is taken.`);
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
        this.query();
      }, (error: HttpErrorResponse) => {
        this.notice.textNotice(`Something want wrong! Maybe name ${this.editProvider?.name} is taken.`);
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
      this.notice.textNotice(`Something want wrong!`);
    })
  }
}
