import { UpperCasePipe } from "@angular/common";
import { Component, computed, Signal, signal, WritableSignal } from "@angular/core";

@Component({
  templateUrl: './hero-page.component.html',
  imports: [ UpperCasePipe ]
})
export class HeroPageComponent {
  public name:WritableSignal<string> = signal("Ironman");
  public age:WritableSignal<number> = signal(45);

  public heroDescription:Signal<string> = computed(()=>{
    const description = `${ this.name()} - ${this.age()}`;
    return description;
  })

  public capitalizedName = computed(()=>{
    return this.name().toUpperCase();
  })

  changeHero() {
    this.name.set("Spiderman");
    this.age.set(22);
  }

  changeAge() {
    this.age.set(60);
  }

  resetForm() {
    this.name.set("Ironman");
    this.age.set(45);
  }
}
