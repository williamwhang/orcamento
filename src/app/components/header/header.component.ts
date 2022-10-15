import { OrcamentoService } from './../../services/orcamento/orcamento.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  orcamento!: number; //exclamação permite iniciar a variavel com NULL

  constructor(private orcamentoService: OrcamentoService,
    private route: Router) {}

  ngOnInit(): void {
    this.orcamentoService.getValor().subscribe(valor => {
      this.orcamento = valor
    })
  }

  irParaOrcamento():void {
    this.route.navigate(['/'])
  }

}
