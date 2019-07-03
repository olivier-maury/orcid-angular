import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { UserInfo } from 'src/app/types'
import { timer, Observable, of, Subject } from 'rxjs'
import {
  switchMap,
  tap,
  delay,
  catchError,
  filter,
  share,
  switchMapTo,
  map,
  startWith,
  retryWhen,
} from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _http: HttpClient) {}
  private currentlyLoggedIn = true
  private loggingStateComesFromTheServer = false
  private $infoOnEachStatusUpdateObservable

  private getUserInfo(): Observable<UserInfo> {
    return this._http.get<UserInfo>(
      'https://localhost:8443/orcid-web/userInfo.json',
      {
        withCredentials: true,
      }
    )
  }

  private getUserStatus() {
    return this._http
      .get<any>('https://localhost:8443/orcid-web/userStatus.json', {
        withCredentials: true,
      })
      .pipe(map(response => response.loggedIn))
  }

  getUserInfoOnEachStatusUpdate() {
    // If an observable already exists, the same is shared between subscriptions
    // If not creates an observable
    if (this.$infoOnEachStatusUpdateObservable) {
      return this.$infoOnEachStatusUpdateObservable
    } else {
      return (this.$infoOnEachStatusUpdateObservable =
        // Every 5 seconds...
        timer(0, 5 * 1000)
          // Check for updates on userStatus.json
          .pipe(switchMapTo(this.getUserStatus()))
          // Check if loggedIn state  has changed since the last time
          //
          // Also turns on the flag loggingStateComesFromTheServer
          // indicating that the current logging state is taken from the server,
          // and not the initial assumption. (more on this on the following pipe)
          .pipe(
            filter(loggedIn => {
              this.loggingStateComesFromTheServer = true
              if (!(loggedIn === this.currentlyLoggedIn)) {
                this.currentlyLoggedIn = loggedIn
                return true
              }
              return false
            })
          )
          // At the very beginning assumes the user is logged in,
          // this is to avoid waiting for userStatus.json before calling userInfo.json on the first load
          .pipe(startWith(true))
          // If the user is logged in get the UserStatus.json
          // If not return a null value
          .pipe(
            switchMap(loggedIn => {
              if (!loggedIn) {
                return of(null)
              }
              if (loggedIn) {
                return this.getUserInfo().pipe(this.handleErrors)
              }
            })
          )
          .pipe(share()))
    }
  }
  private handleErrors(gerUserInfo: Observable<UserInfo>) {
    return (
      gerUserInfo
        .pipe(
          // If UserInfo.json give an error it retries only if the user is currently logged in
          //
          // This is necessary because in some cases when the userStatus.json responded with { logging = true }
          // and the userInfo.json is called immediately after it responds with an error
          retryWhen(errors =>
            errors.pipe(delay(1000)).pipe(
              tap(x => {
                if (
                  !(
                    this.currentlyLoggedIn &&
                    this.loggingStateComesFromTheServer
                  )
                ) {
                  throw new Error()
                }
              })
            )
          )
        )
        // This is necessary since the backend responds with a CORS error when a
        // user is not logged in and userInfo.json is called
        .pipe(catchError(error => of(null)))
    )
  }
}