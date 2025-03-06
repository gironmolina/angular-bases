import { Component, signal, WritableSignal } from "@angular/core";

@Component({
  templateUrl: './counter-page.component.html',
  styleUrl: './counter-page.component.css'
})
export class CounterPageComponent {
  public counter:number = 10;
  public counterSignal:WritableSignal<number> = signal(10);

  increaseBy(value:number){
    this.counter += value;
    this.counterSignal.update(current => current+=value);
  }

  resetCounter() {
    this.counter = 0;
    this.counterSignal.set(0);
  }
}
