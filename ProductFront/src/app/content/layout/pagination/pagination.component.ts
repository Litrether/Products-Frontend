import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { IPagination } from 'src/app/core/interfaces/pagination-interfaces';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Output() changePage = new EventEmitter<number>();
  @Input() MetaData: IPagination;
  @Input() isActive: boolean;

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => this.changePage.emit(this.MetaData.CurrentPage));
  }

  prevPage() {
    if (!this.isActive)
      return;

    if (this.MetaData.CurrentPage > 1) {
      this.isActive = true;
      this.changePage.emit(--this.MetaData.CurrentPage);
    }
  }

  nextPage() {
    if (!this.isActive)
      return;

    if (this.MetaData.CurrentPage < this.MetaData.TotalPages) {
      this.isActive = true;
      this.changePage.emit(++this.MetaData.CurrentPage);
    }
  }

  setPage() {

    var page = (<HTMLInputElement>(document.getElementById('page-input'))).valueAsNumber;

    if (page < 0)
      this.MetaData.CurrentPage = 1;
    else if (page > this.MetaData.TotalPages)
      this.MetaData.CurrentPage = this.MetaData.TotalPages;
    else
      this.MetaData.CurrentPage = page;

    this.changePage.emit(this.MetaData.CurrentPage);
  }
}
