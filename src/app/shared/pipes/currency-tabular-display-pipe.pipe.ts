import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'currencyTabularDisplayPipe'
})
export class CurrencyTabularDisplayPipePipe implements PipeTransform {

  transform(value: number, locale?: string = 'hr-HR'): string {
    const disp = new Intl.NumberFormat(locale, {style: 'currency'}).format(value);

    return disp;
  }

}
