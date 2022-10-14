import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrcamentoComponent } from './pages/orcamento/orcamento.component';
import { ProdutoComponent } from './pages/produto/produto.component';

const routes: Routes = [
  {path: '', component: OrcamentoComponent},
  {path: 'produto', component: ProdutoComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
