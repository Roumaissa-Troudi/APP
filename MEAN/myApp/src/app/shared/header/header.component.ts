import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/shared/employee.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() isMenuOpened: boolean;
  @Output() isShowSidebar = new EventEmitter<any>();


  constructor( private route: Router, public employeeService: EmployeeService) {}

  ngOnInit(): void {}
  public openMenu(): void {
    this.isMenuOpened = !this.isMenuOpened;
  }

  togglesidebar() {
    this.isShowSidebar.emit();
  }
  public signOut(): void {
    this.employeeService.signOut();

    this.route.navigateByUrl('/login');
  }
}
