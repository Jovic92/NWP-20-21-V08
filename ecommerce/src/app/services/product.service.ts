import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs';
import { Product } from '../model/product';

@Injectable()
export class ProductService {

  constructor(private httpClient: HttpClient) {}

  BACKEND_BASE = 'http://localhost:3000'

  getProducts(query: string): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.BACKEND_BASE + '/api/product', {
      params: {q: query}
    });
  }

  changeQuantity(id: number, changeInQuantity: number): Observable<any> {
    return this.httpClient.patch(this.BACKEND_BASE + '/api/product/' + id, {changeInQuantity: changeInQuantity});
  }

  createProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(this.BACKEND_BASE + '/api/product', product);
  }
}
