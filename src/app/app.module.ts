import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {LayoutModule} from './layout/layout.module';
import {HttpClientModule} from '@angular/common/http';
import '@angular/common/locales/global/hr';
import {NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import {CroatianDateParserFormatter} from './shared/utility/croatian-date-parser.formatter';
import {httpInterceptorProviders} from './shared/interceptors';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production})
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'hr'
    },
    {
      provide: NgbDateParserFormatter,
      useClass: CroatianDateParserFormatter
    },
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
