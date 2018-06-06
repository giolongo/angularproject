import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizzaSkillComponent } from './visualizza-skill.component';

describe('VisualizzaSkillComponent', () => {
  let component: VisualizzaSkillComponent;
  let fixture: ComponentFixture<VisualizzaSkillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizzaSkillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizzaSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
