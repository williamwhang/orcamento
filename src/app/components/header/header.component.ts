import { OrcamentoService } from './../../services/orcamento/orcamento.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  orcamento!: number; //exclamação permite iniciar a variavel com NULL

  constructor(private orcamentoService: OrcamentoService) {}

  ngOnInit(): void {
    this.orcamentoService.getValor().subscribe(valor => {
      this.orcamento = valor
    })
  }

}
