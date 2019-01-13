import { Component, OnInit, Input } from '@angular/core'
import { Affiliations, AffiliationUIGrouping } from '../../../types'

@Component({
  selector: 'app-profile-records',
  templateUrl: './profile-records.component.html',
  styleUrls: ['./profile-records.component.scss'],
})
export class ProfileRecordsComponent implements OnInit {
  panelState = {
    employment: true,
  }
  affiliationUIGrouping = AffiliationUIGrouping

  _profileAffiliationsData: Affiliations
  @Input('profileAffiliationsData')
  set profileAffiliationsData(value: Affiliations) {
    this._profileAffiliationsData = value
  }
  get profileAffiliationsData(): Affiliations {
    return this._profileAffiliationsData
  }

  constructor() {}

  ngOnInit() {}
}
