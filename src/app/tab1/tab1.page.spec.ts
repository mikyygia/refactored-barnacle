import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { InsightPage } from './tab1.page';

describe('Tab1Page', () => {
  let component: InsightPage;
  let fixture: ComponentFixture<InsightPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InsightPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(InsightPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
