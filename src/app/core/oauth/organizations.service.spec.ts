import { TestBed } from '@angular/core/testing'

import { OauthService } from './oauth.service'

describe('OrganizationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}))

  it('should be created', () => {
    const service: OauthService = TestBed.get(OauthService)
    expect(service).toBeTruthy()
  })
})
