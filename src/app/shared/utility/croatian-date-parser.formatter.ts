import {NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {Injectable} from '@angular/core';

@Injectable()
export class CroatianDateParserFormatter extends NgbDateParserFormatter {

  format(date: NgbDateStruct | null): string {
    if (!date) {
      return '';
    }

    return `${date.day < 10 ? '0' : ''}${date.day}.${date.month < 10 ? '0' : ''}${date.month}.${date.year}.`;
  }

  parse(value: string): NgbDateStruct | null {
    if (!value) {
      return null;
    }

    const dotSplitMembers = value.split('.').filter(x => x);

    if (dotSplitMembers.length !== 3) {
      return null;
    }

    const parsedDateParts = dotSplitMembers.map(x => parseInt(x, 10));
    const parsedSuccessfully = parsedDateParts.every(x => !!x);

    if (!parsedSuccessfully) {
      return null;
    }

    return {year: parsedDateParts[2], month: parsedDateParts[1], day: parsedDateParts[0]};
  }

}
