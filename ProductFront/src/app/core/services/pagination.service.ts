import { Injectable } from '@angular/core';
import { IPagination } from '../interfaces/pagination-interfaces';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  public MetaData: IPagination = {
    CurrentPage: 1,
    HasNext: false,
    HasPrevious: false,
    PageSize: 0,
    TotalCount: 0,
    TotalPages: 0,

  }

  constructor() { }

  leftPage() {
    if (this.MetaData.CurrentPage > 1) {
      this.MetaData.CurrentPage--;
    }
  }

  rightPage() {
    if (this.MetaData.CurrentPage < this.MetaData.TotalPages) {
      this.MetaData.CurrentPage++;
    }
  }
}
