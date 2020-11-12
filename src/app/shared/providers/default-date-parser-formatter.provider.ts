import {Provider} from '@angular/core';
import {NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import {CroatianDateParserFormatter} from '../utility/croatian-date-parser.formatter';

export const defaultDateParserFormatter: Provider = {
  provide: NgbDateParserFormatter,
  useClass: CroatianDateParserFormatter
};
