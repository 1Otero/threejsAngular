import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewthreejscuborubikComponent } from './viewthreejscuborubik.component';

describe('ViewthreejscuborubikComponent', () => {
  let component: ViewthreejscuborubikComponent;
  let fixture: ComponentFixture<ViewthreejscuborubikComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewthreejscuborubikComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewthreejscuborubikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
