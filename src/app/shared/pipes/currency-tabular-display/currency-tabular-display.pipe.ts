import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'currencyTabularDisplay'
})
export class CurrencyTabularDisplayPipe implements PipeTransform {

  transform(value: number, currLocale: string = 'hr-HR'): string {
    return new Intl.NumberFormat(currLocale, {useGrouping: true, maximumFractionDigits: 2, minimumFractionDigits: 2}).format(value);
  }

}
