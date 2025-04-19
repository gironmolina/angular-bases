import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProductsResponse } from '@products/interfaces/product.interface';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;

interface Options {
  limit?: number;
  offset?: number;
  gender?: string;
}

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private readonly http = inject(HttpClient);

  getProducts(Options: Options): Observable<ProductsResponse> {
    const { limit = 10, offset = 0, gender = '' } = Options;

    return this.http.get<ProductsResponse>(`${baseUrl}/products`, {
      params: {
        limit,
        offset,
        gender,
      },
    });
  }
}
