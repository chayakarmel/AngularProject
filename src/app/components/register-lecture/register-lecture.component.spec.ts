import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterLectureComponent } from './register-lecture.component';

describe('RegisterLectureComponent', () => {
  let component: RegisterLectureComponent;
  let fixture: ComponentFixture<RegisterLectureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterLectureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterLectureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
