import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LogPage } from './tab2.page';

describe('LogPage', () => {
  let component: LogPage;
  let fixture: ComponentFixture<LogPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogPage],
    }).compileComponents();

    fixture = TestBed.createComponent(LogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});