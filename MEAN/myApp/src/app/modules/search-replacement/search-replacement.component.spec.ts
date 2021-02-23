import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchReplacementComponent } from './search-replacement.component';

describe('SearchReplacementComponent', () => {
  let component: SearchReplacementComponent;
  let fixture: ComponentFixture<SearchReplacementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchReplacementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchReplacementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
