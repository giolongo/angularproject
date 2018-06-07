import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistraPermessoComponent } from './registra-permesso.component';

describe('RegistraPermessoComponent', () => {
  let component: RegistraPermessoComponent;
  let fixture: ComponentFixture<RegistraPermessoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistraPermessoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistraPermessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
