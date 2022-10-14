import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { Produto } from 'src/app/models/produto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private baseURL = 'http://localhost:3000/produtos'

  private produtos$ = new BehaviorSubject<Produto[]>([]);

  produtoDeAlteracao$ = new BehaviorSubject<Produto>({
    description: "string",
    quantity: 1,
    price: 1
  })

  constructor(private http: HttpClient) {
    this.read();
   }

  setProdutoAlteracao(produto: Produto) {
    this.produtoDeAlteracao$.next(produto)
  }

  checkProdutos() {
    return this.produtos$.asObservable();
  }

  create(produto: Produto) {
    return this.http.post(this.baseURL, produto).pipe(take(1));
  }

  read() {
    return this.http.get(this.baseURL).subscribe((data: any | Produto[]) => {
      this.produtos$.next(data);
      return data;
    });
  }

  update(id:number, data: Produto) {
    return this.http.put(`${this.baseURL}/${id}`, data).pipe(take(1));
  }

  delete(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`).pipe(take(1));
  }

}
