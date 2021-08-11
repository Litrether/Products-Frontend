import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPagination } from 'src/app/core/interfaces/pagination-interfaces';
import { ICommonParams } from 'src/app/core/interfaces/params-interfaces';
import { IProvider } from 'src/app/core/interfaces/providers-interfaces';
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

  editId: number = -1;
  public params: ICommonParams = {
    pageNumber: 1,
  }

  constructor(private router: Router,
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

  deleteItem(provider: IProvider) {
    if (!confirm(`Are you sure want to delete ${provider.name}?`)) {
      return;
    }
    this.isLoad = false;
    this.providerService.DeleteProvider(provider).subscribe(() => {
      this.query();
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
      this.isLoad = false;
      this.providerService.UpdateProvider(provider).subscribe((data: any) => {
        this.query();
      });
      this.editId = -1;
    }
  }
}
