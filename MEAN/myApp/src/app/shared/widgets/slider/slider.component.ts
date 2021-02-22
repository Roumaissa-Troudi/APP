import { Component, EventEmitter, OnInit , Output} from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  value: number = 0;
  options: Options = {
    ceil: 10,
    floor: 0,
    showSelectionBar: true,
    showTicks: true,
    getTickColor: (value: number): string => {
      if (value < 3) {
        return 'red';
      }
      if (value < 5) {
        return 'orange';
      }
      if (value < 7) {
        return 'yellow';
      }
      return '#2AE02A';
    }
  };
  @Output() healthvalue= new EventEmitter<number>() ;

  healthValueEmit() {
    this.healthvalue.emit(this.value);
  }
}
