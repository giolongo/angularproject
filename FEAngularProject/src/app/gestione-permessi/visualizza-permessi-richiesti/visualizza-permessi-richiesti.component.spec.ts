import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizzaPermessiRichiestiComponent } from './visualizza-permessi-richiesti.component';

describe('VisualizzaPermessiRichiestiComponent', () => {
  let component: VisualizzaPermessiRichiestiComponent;
  let fixture: ComponentFixture<VisualizzaPermessiRichiestiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizzaPermessiRichiestiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizzaPermessiRichiestiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
