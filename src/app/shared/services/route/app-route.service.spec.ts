import {TestBed} from '@angular/core/testing';
import {baseHref} from '../../providers/base-href.provider';
import {AppRouteService} from './app-route.service';

describe('AppRouteService', () => {
  let service: AppRouteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        baseHref
      ]
    });
    service = TestBed.inject(AppRouteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
