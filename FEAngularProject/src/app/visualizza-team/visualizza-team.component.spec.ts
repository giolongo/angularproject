import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizzaTeamComponent } from './visualizza-team.component';

describe('VisualizzaTeamComponent', () => {
  let component: VisualizzaTeamComponent;
  let fixture: ComponentFixture<VisualizzaTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizzaTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizzaTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
