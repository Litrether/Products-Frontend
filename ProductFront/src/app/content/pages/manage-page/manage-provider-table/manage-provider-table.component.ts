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
  public params = {
    searchTerm: '',
    pageSize: 5,
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

  deleteItem(provider: IProvider) {
    if (!confirm(`Are you sure want to delete ${provider.name}?`)) {
      return;
    }
    this.providerService.DeleteProvider(provider.id).subscribe(() => {
      this.ngOnInit();
    })
  }
}
