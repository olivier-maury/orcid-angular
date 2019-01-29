import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core'
import { heightAnimation } from 'src/app/animations'
import { AffiliationsDetails, OrgDisambiguated } from 'src/app/types'
import { AnimationEvent } from '@angular/animations'

@Component({
  selector: 'app-profile-records-card-detail',
  templateUrl: './profile-records-card-detail.component.html',
  styleUrls: ['./profile-records-card-detail.component.scss'],
  animations: [heightAnimation],
})
export class ProfileRecordsCardDetailComponent implements OnInit {
  _orgDisambiguated: OrgDisambiguated
  @Input() detailShowLoader
  @Input() sourceType
  @Input() createdDate
  @Input() lastModified
  @Input() detailShowOffline
  @Input() detailShowData
  @Input() url
  _state

  @Output()
  stateChange = new EventEmitter()
  @Input()
  set state(value) {
    this._state = value
    this.stateChange.emit(value)
  }
  get state() {
    return this._state
  }
  @Input()
  set orgDisambiguated(value: OrgDisambiguated) {
    this._orgDisambiguated = value
    this.regionCityCountryPipe()
  }
  get orgDisambiguated(): OrgDisambiguated {
    return this._orgDisambiguated
  }

  @Input() affiliationDetails: AffiliationsDetails

  regionCityCountry
  constructor() {}

  ngOnInit() {}

  regionCityCountryPipe() {
    if (this.orgDisambiguated) {
      this.regionCityCountry = ''
      this.regionCityCountry += this.orgDisambiguated.region
        ? this.orgDisambiguated.region
        : ''
      this.regionCityCountry += this.orgDisambiguated.city
        ? this.orgDisambiguated.region
          ? ', ' + this.orgDisambiguated.city
          : this.orgDisambiguated.city
        : ''

      this.regionCityCountry += this.orgDisambiguated.country
        ? this.orgDisambiguated.city
          ? ', ' + this.orgDisambiguated.country
          : this.orgDisambiguated.country
        : ''
    }
  }

  isUrl(element) {
    const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi
    const regex = new RegExp(expression)
    return element.match(regex)
  }

  onAnimationEvent(event: AnimationEvent) {
    // This is a quick fix to solve the current Angular animation problem with ngFor animations on reordering actions.
    // https://github.com/angular/angular/issues/18847
    // The problem:
    // When a list display by a ngFor is reordered, the animation state of the repositioned
    // elements are going to change to void, this only happens the first time the element is moved.
    // More info about this problem can be found on src/animations.ts

    if (
      event.triggerName === 'heightAnimationState' &&
      event.toState === 'void' &&
      this.state === 'open'
    ) {
      this.state = 'close'
    }
  }
}
