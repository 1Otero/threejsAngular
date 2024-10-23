import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewthreejststComponent } from './viewthreejstst.component';

describe('ViewthreejststComponent', () => {
  let component: ViewthreejststComponent;
  let fixture: ComponentFixture<ViewthreejststComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewthreejststComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewthreejststComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
