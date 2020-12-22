import { HttpClientModule } from '@angular/common/http';
import '@angular/common/locales/global/hr';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { AppBadgeModule } from './shared/components/app-badge/app-badge.module';
import { CopyrightModule } from './shared/components/copyright/copyright.module';
import { UserInfoModule } from './shared/components/user-info/user-info.module';
import { baseHref } from './shared/providers/base-href.provider';
import { defaultDateParserFormatter } from './shared/providers/default-date-parser-formatter.provider';
import { localeId } from './shared/providers/locale-id.provider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    HttpClientModule,
    CopyrightModule,
    AppBadgeModule,
    UserInfoModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],
  providers: [
    localeId,
    baseHref,
    defaultDateParserFormatter,
    // httpInterceptorProviders
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
