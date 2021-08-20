import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IPagination } from 'src/app/core/interfaces/pagination-interfaces';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Output() changePage = new EventEmitter<number>();

  public MetaData: IPagination = {
    CurrentPage: 1,
    HasNext: false,
    HasPrevious: false,
    PageSize: 0,
    TotalCount: 0,
    TotalPages: 0,
  }
  public isActive: boolean = true;

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => this.changePage.emit(this.MetaData.CurrentPage));
  }

  prevPage() {
    if (!this.isActive)
      return;

    if (this.MetaData.CurrentPage > 1) {
      this.changePage.emit(--this.MetaData.CurrentPage);
    }
  }

  nextPage() {
    if (!this.isActive)
      return;

    if (this.MetaData.CurrentPage < this.MetaData.TotalPages) {
      this.changePage.emit(++this.MetaData.CurrentPage);
    }
  }

  reset() {
    this.MetaData.CurrentPage = 1;
    this.MetaData.TotalCount = 0;
  }
}
