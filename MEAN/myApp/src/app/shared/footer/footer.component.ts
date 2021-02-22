import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  public TUM: string = 'https://www.tum.de';
  public TUMMW: string = 'https://www.mw.tum.de';
  public IWB: string = 'https://www.mw.tum.de/iwb/startseite/';
}
