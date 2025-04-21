import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-creditos',
  standalone: true,
  imports: [],
  templateUrl: './creditos.component.html',
  styleUrl: './creditos.component.css'
})
export class CreditosComponent {
  @Input() isOpen:boolean = false
  @Output() fecharCreditos = new EventEmitter<void>();

  close() {
    this.fecharCreditos.emit();
  }
}
