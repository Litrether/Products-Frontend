import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProvider, IFoundProvider} from 'src/app/core/interfaces/providers-interfaces';
import { ProviderApiService } from 'src/app/core/services/api-services/provider-api.service';

@Component({
  selector: 'app-providers-page',
  templateUrl: './providers-page.component.html',
  styleUrls: ['./providers-page.component.css']
})
export class ProvidersPageComponent implements OnInit {

  providers: IFoundProvider[] = [];

  private params = {
    searchTerm: '',
    pageSize: null,
    pageNumber: null,
    orderBy: ''
  }

  constructor(private router: Router,
    private providerService: ProviderApiService) { 
    }
    
  ngOnInit(): void {
    this.providerService.GetAllProviders(this.params).subscribe((data: IFoundProvider[]) => this.providers=data);
  }

  addItem() {
    const log = this.router.navigate(['/admin', 'providerdetail'])
  }

  deleteItem(provider: IProvider){
    if(!confirm('Are you sure want to delete ${provider.name}?')){
      return;
    }
    //this.providerService.DeleteProvider(provider.id).subscribe(() => {
      //this.providers$ = this.providerService.GetAllProviders();
    //})
  }
}
