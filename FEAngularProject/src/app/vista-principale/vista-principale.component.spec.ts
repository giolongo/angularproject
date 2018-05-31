import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaPrincipaleComponent } from './vista-principale.component';

describe('VistaPrincipaleComponent', () => {
  let component: VistaPrincipaleComponent;
  let fixture: ComponentFixture<VistaPrincipaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistaPrincipaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaPrincipaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
