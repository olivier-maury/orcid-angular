import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { FormPersonalAdditionalEmailsComponent } from './form-personal-additional-emails.component'

describe('FormPersonalAdditionalEmailsComponent', () => {
  let component: FormPersonalAdditionalEmailsComponent
  let fixture: ComponentFixture<FormPersonalAdditionalEmailsComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormPersonalAdditionalEmailsComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPersonalAdditionalEmailsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
