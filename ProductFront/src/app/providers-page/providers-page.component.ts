import { Component, OnInit, Provider } from '@angular/core';
import { Router } from '@angular/router';
import { FoundProvider } from 'src/app/core/interfaces/interfaces';
import { ProviderService } from 'src/app/core/services/provider.service';

@Component({
  selector: 'app-providers-page',
  templateUrl: './providers-page.component.html',
  styleUrls: ['./providers-page.component.css']
})
export class ProvidersPageComponent implements OnInit {

  providers: FoundProvider[] = [];

  constructor(private router: Router,
    private providerService: ProviderService) { 
      this.providerService.GetAllProviders().subscribe((data: FoundProvider[]) => this.providers=data);
    }

  ngOnInit(): void {
  }

  addItem() {
    const log = this.router.navigate(['/admin', 'providerdetail'])
  }

  deleteItem(provider: Provider){
    if(!confirm('Are you sure want to delete ${provider.name}?')){
      return;
    }
    //this.providerService.DeleteProvider(provider.id).subscribe(() => {
      //this.providers$ = this.providerService.GetAllProviders();
    //})
  }
}
