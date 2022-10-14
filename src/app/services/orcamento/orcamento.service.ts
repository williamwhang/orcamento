import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class OrcamentoService {

  private valorOrcamento$ = new BehaviorSubject<number>(0)

  constructor() { }

  getValor(): Observable<number> {
    return this.valorOrcamento$.asObservable()
  }

  setValor(value: number) {
    this.valorOrcamento$.next(value)
  }

  subtrairValor(value: number) {
    const valorSubtraido = this.valorOrcamento$.value - value

    this.setValor(valorSubtraido)
  }

  adicionarValor(value: number) {
    const valorAdicionado = this.valorOrcamento$.value + value

    this.setValor(valorAdicionado)
  }
}
