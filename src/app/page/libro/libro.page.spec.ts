import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibroPage } from './libro.page';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

describe('LibroPage', () => {
  let component: LibroPage;
  let fixture: ComponentFixture<LibroPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LibroPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(LibroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
