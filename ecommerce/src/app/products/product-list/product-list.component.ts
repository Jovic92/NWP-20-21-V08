import { Component, OnInit } from '@angular/core';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/merge';
import { Observable, Subject } from 'rxjs';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';
import { ProductQuantityChange } from 'src/app/model/product-quantity-change';


@Component({
  selector: 'app-product-list',
  template: `
    <div>
      <input type="text"
             placeholder="Search products"
             name="searchBox"
             [(ngModel)]="searchTerm"
             (keyup)="search()"/>
    </div>
    <app-product-item [product]="product"
                      (quantityChange)="onQuantityChange($event)"
                      *ngFor="let product of products$ | async"></app-product-item>
  `,
  styles: []
})
export class ProductListComponent implements OnInit {

  public products$: Observable<Product[]>;
  public searchTerm: string = '';

  private searchSubject: Subject<string> = new Subject();
  private reloadProductsList: Subject<void> = new Subject();

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.products$ = this.searchSubject
        .startWith(this.searchTerm)
        .debounceTime(300)
        .distinctUntilChanged()
        .merge(this.reloadProductsList)
        .switchMap((query) => this.productService.getProducts(this.searchTerm));
  }

  search() {
    this.searchSubject.next(this.searchTerm);
  }

  onQuantityChange(change: ProductQuantityChange) {
    this.productService.changeQuantity(change.product.id, change.changeInQuantity)
        .subscribe((res) => this.reloadProductsList
        .next());
  }

  onCreate() {
    this.reloadProductsList.next();
  }
}
