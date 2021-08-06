import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPagination } from 'src/app/core/interfaces/pagination-interfaces';
import { IProvider } from 'src/app/core/interfaces/providers-interfaces';
import { ProviderApiService } from 'src/app/core/services/api-services/provider-api.service';

@Component({
  selector: 'app-manage-provider-table',
  templateUrl: './manage-provider-table.component.html',
  styleUrls: ['./manage-provider-table.component.css']
})
export class ManageProviderTableComponent implements OnInit {
  providers: IProvider[] = [];
  pagination: IPagination;

  editId: number = -1;
  public params = {
    searchTerm: '',
    pageSize: 10,
    pageNumber: 1,
    orderBy: ''
  }

  constructor(private router: Router,
    private providerService: ProviderApiService) { }

  ngOnInit(): void {
    this.providerService.GetAllProviders(this.params).subscribe((resp: any) => {
      this.providers = resp.body;
    })
  }

  orderBy(orderBy: string) {
    this.params.orderBy = orderBy;
    this.ngOnInit();
  }

  deleteItem(provider: IProvider) {
    if (!confirm(`Are you sure want to delete ${provider.name}?`)) {
      return;
    }
    this.providerService.DeleteProvider(provider.id).subscribe(() => {
      this.ngOnInit();
    })
  }

  editItem(provider: IProvider) {
    if (this.editId == -1) {
      this.editId = provider.id;
    }
  }

  submitEdit(submit: boolean) {
    if (submit == true) {
      var provider: IProvider = {
        id: this.editId,
        name: (<HTMLInputElement>(document.getElementById('editName'))).value
      }
      this.providerService.UpdateProvider(provider).subscribe((data: any) => {
        console.log(data)
        this.ngOnInit()
      });
      this.editId = -1;
    }
  }
}
