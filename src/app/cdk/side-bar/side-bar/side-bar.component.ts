import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
import { UserService } from 'src/app/core'
import { RecordService } from 'src/app/core/record/record.service'
import { NameForm, RequestInfoForm, UserInfo } from 'src/app/types'
import { UserRecord } from 'src/app/types/record.local'
import { ModalCountryComponent } from '../modals/modal-country/modal-country.component'
import { ModalEmailComponent } from '../modals/modal-email/modal-email.component'

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: [
    './side-bar.component.scss-theme.scss',
    './side-bar.component.scss',
  ],
})
export class SideBarComponent implements OnInit, OnDestroy {
  @Input() onlyOrcidId = false

  modalEmailComponent = ModalEmailComponent
  modalCountryComponent = ModalCountryComponent

  destroy$: Subject<boolean> = new Subject<boolean>()
  userSession: {
    userInfo: UserInfo
    nameForm: NameForm
    oauthSession: RequestInfoForm
    displayName: string
    orcidUrl: string
    loggedIn: boolean
  }
  userRecord: UserRecord
  constructor(private _user: UserService, private _record: RecordService) {}

  ngOnInit(): void {
    this._user
      .getUserSession()
      .pipe(takeUntil(this.destroy$))
      .subscribe((userSession) => {
        this.userSession = userSession

        // TODO @amontenegro
        // AVOID requiring the orcid url to getPerson to call all the record data on parallel
        this._record
          .getRecord(this.userSession.userInfo.EFFECTIVE_USER_ORCID)
          .pipe(takeUntil(this.destroy$))
          .subscribe((userRecord) => {
            this.userRecord = userRecord
          })
      })
  }

  ngOnDestroy() {
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
}
