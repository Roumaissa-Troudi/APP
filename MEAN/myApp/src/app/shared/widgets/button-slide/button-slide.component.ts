import { Component, OnInit, EventEmitter,Output } from '@angular/core';

@Component({
  selector: 'app-button-slide',
  templateUrl: './button-slide.component.html',
  styleUrls: ['./button-slide.component.css']
})
export class ButtonSlideComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  @Output() workvalue= new EventEmitter<any>() ;

  checked = false;

  changed(){
    console.log(this.checked);
    this.workvalue.emit(this.checked);
  }


}
