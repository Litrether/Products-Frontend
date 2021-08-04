import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProvider} from 'src/app/core/interfaces/providers-interfaces';
import { ProviderApiService } from 'src/app/core/services/api-services/provider-api.service';

@Component({
  selector: 'app-providers-page',
  templateUrl: './providers-page.component.html',
  styleUrls: ['./providers-page.component.css']
})
export class ProvidersPageComponent implements OnInit {

  providers: IProvider[] = [];

  private params = {
    searchTerm: '',
    pageSize: 10,
    pageNumber: 1,
    orderBy: ''
  }

  constructor(private router: Router,
    private providerService: ProviderApiService) { 
    }
    
  ngOnInit(): void {
    this.providerService.GetAllProviders(this.params).subscribe(
      (data: IProvider[]) => this.providers=data);
  }

  search() {
    this.params.searchTerm = (<HTMLInputElement>(document.getElementById('search-input'))).value;
    this.params.pageNumber = 1;
    this.ngOnInit();
  }

  addItem() {
    const log = this.router.navigate(['/user', 'providerdetail'])
  }

  deleteItem(provider: IProvider){
    if(!confirm('Are you sure want to delete ${provider.name}?')){
      return;
    }
    this.providerService.DeleteProvider(provider.id);
    
    }
}
