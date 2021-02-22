import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HeaderModule } from './header/header.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { SliderComponent } from './widgets/slider/slider.component';
import { ValueTableComponent } from '../modules/health-status/value-table/value-table.component';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [FooterComponent, SidebarComponent, SliderComponent,ValueTableComponent],
  imports: [
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    RouterModule,
    CommonModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    MatSelectModule,
    FormsModule,
    MatSidenavModule,
    HeaderModule,
    MatCardModule,NgxSliderModule,
    MatTableModule

  ],
  exports: [FooterComponent, SidebarComponent, HeaderModule,SliderComponent,ValueTableComponent],
})
export class SharedModule {}
