import { ProdutoService } from './../../services/produto/produto.service';
import { OrcamentoService } from 'src/app/services/orcamento/orcamento.service';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produto } from 'src/app/models/produto.interface';


@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {
  formProduto: any
  produtos$: any
  displayedColumns: string[] = ['Produto', 'Quantidade', 'Preço', 'Total', 'Ações']

  alteracaoProduto!: Produto

  openOrCloseModal: boolean = false

  constructor(
    private orcamentoService: OrcamentoService,
    private produtoService: ProdutoService,
    private route: Router
  ) {

    this.formProduto = new FormGroup({
      description: new FormControl("", Validators.compose([
        Validators.required
      ])),
      quantity: new FormControl("", Validators.compose([
        Validators.required,
        Validators.min(1)
      ])),
      price: new FormControl("", Validators.compose([
        Validators.required
      ]))
    })

    this.produtoService.read()
  }

  ngOnInit(): void {
    this.produtoService.checkProdutos().subscribe(
      data => {
        this.produtos$ = data
      }
    )

    this.orcamentoService.getValor().subscribe(
      data => {
        if(!data) {
          this.route.navigate([''])
        }
      }
    )
  }

  abrirOuFecharModal() {
    this.openOrCloseModal = !this.openOrCloseModal
  }

  gravarProduto(data: NgForm) {
    const produto = data.value
    const total = this.calcularTotal(produto.quantity, produto.price)

    const novoProduto = { total: total, ...produto }

    this.orcamentoService.subtrairValor(total)

    //gravar produto na base dados
    this.gravaProdutoDb(novoProduto, data)
  }

  calcularTotal(quantity: number, price: number): number {
    return quantity * price
  }

  gravaProdutoDb(produto: any, data: NgForm) {
    this.produtoService.create(produto).subscribe(
      success => {
        this.produtoService.read()
        this.resetForm()
      },
      error => console.log("ERROR ===", error)
    )
  }

  resetForm() {
    this.formProduto.reset()

    this.formProduto.controls.description.status = 'VALID'
    this.formProduto.controls.quantity.status = 'VALID'
    this.formProduto.controls.price.status = 'VALID'
  }

  excluirProduto(id: number, valor: number) {
    this.produtoService.delete(id).subscribe(
      success => {
        this.orcamentoService.adicionarValor(valor)
        this.produtoService.read()
      },
      error => console.log("ERROR !!", error)
    )
  }

  alterarProduto(produto: Produto) {
    this.produtoService.setProdutoAlteracao(produto)
    this.abrirOuFecharModal()
  }

}
