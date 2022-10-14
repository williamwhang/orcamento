import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-acoes',
  templateUrl: './acoes.component.html',
  styleUrls: ['./acoes.component.css']
})
export class AcoesComponent implements OnInit {

  @Output() delete = new EventEmitter
  @Output() alter = new EventEmitter

  constructor() { }

  ngOnInit(): void {
  }

  emitClick(id: number): void {
    id === 1
      ? this.alter.emit(1)
      : this.delete.emit(1)
  }

}
