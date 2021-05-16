import { Component } from '@angular/core';
import { routes } from '../../../consts/routes';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  public routes: typeof routes = routes;

  public isShowInput = false;

  public showInput(): void {
    this.isShowInput = true;
  }
}
