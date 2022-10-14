import { OrcamentoService } from 'src/app/services/orcamento/orcamento.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProdutoService } from 'src/app/services/produto/produto.service';

@Component({
  selector: 'app-orcamento',
  templateUrl: './orcamento.component.html',
  styleUrls: ['./orcamento.component.css']
})
export class OrcamentoComponent implements OnInit {

  formOrcamento: any;

  total: number = 0;

  constructor(private orcamentoService: OrcamentoService,
    private produtoService: ProdutoService,
    private router: Router,
    private fb: FormBuilder) {
      this.formOrcamento = this.fb.group({
        orcamento: [
          null,
          Validators.compose([
            Validators.required,
            Validators.max(2000),
            Validators.min(100)
          ])
        ]
      })
  }

  ngOnInit(): void {
    this.checkProduto();
  }

  gravarOrcamento(orcamento: NgForm) {
    const valorOrcamento = orcamento.value.orcamento - this.total

    this.total = 0

    this.orcamentoService.setValor(valorOrcamento)

    // redirecionar o usuário para tela de produtos
    this.router.navigate(['/produto'])

    orcamento.reset()

    this.formOrcamento.cotrols.orcamento.status = "VALID"
  }

  checkProduto() {
    this.produtoService.checkProdutos().subscribe(
      data => {
        data.forEach(
          (produto: any) => {
            this.total += produto.total

          }
        )
      }
    )
  }

}
