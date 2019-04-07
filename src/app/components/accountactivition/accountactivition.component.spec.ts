import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountactivitionComponent } from './accountactivition.component';

describe('AccountactivitionComponent', () => {
  let component: AccountactivitionComponent;
  let fixture: ComponentFixture<AccountactivitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountactivitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountactivitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
