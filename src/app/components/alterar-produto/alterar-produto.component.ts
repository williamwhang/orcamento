import { FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProdutoService } from 'src/app/services/produto/produto.service';
import { OrcamentoService } from 'src/app/services/orcamento/orcamento.service';

@Component({
  selector: 'app-alterar-produto',
  templateUrl: './alterar-produto.component.html',
  styleUrls: ['./alterar-produto.component.css']
})
export class AlterarProdutoComponent implements OnInit {

  formModal: any;

  dataProduto: any;

  @Output() close = new EventEmitter

  constructor(
    private service: ProdutoService,
    private orcamentoService: OrcamentoService
  ) { }

  ngOnInit(): void {

    this.service.produtoDeAlteracao$.subscribe(produto => {
      this.dataProduto = produto;
    })

    console.log(this.dataProduto)

    this.formModal = new FormGroup({
      description: new FormControl(this.dataProduto.description, Validators.compose([
        Validators.required
      ])),
      quantity: new FormControl(this.dataProduto.quantity, Validators.compose([
        Validators.required,
        Validators.min(1)
      ])),
      price: new FormControl(this.dataProduto.price, Validators.compose([
        Validators.required
      ]))
    })


  }

  closeModal() {
    this.close.emit()
  }

  alterarProduto(formData: NgForm) {
    console.log(formData.value)
    let produto = formData.value;

    //calcula novo total
    const total = this.calcularNovoTotal(produto.quantity, produto.price)

    produto = {total: total, ...produto}

    //atualiza o novo valor total com quantidade no orçamento
    this.service.update(this.dataProduto.id, produto).subscribe((res: any) => {
      console.log(res)

      // devolve o valor total antigo para o orçamento
      this.orcamentoService.adicionarValor(this.dataProduto.total)

      // subtrai o valor total atual
      this.orcamentoService.subtrairValor(res.total)

      // atualiza o novo valor
      this.service.read()
    })

    this.formModal.reset()

    this.close.emit()
  }

  calcularNovoTotal(quantity: number, price: number) {
    return quantity * price
  }

}
