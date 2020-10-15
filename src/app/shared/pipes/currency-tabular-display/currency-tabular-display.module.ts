import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CurrencyTabularDisplayPipe} from './currency-tabular-display.pipe';


@NgModule({
  declarations: [CurrencyTabularDisplayPipe],
  imports: [CommonModule],
  exports: [CurrencyTabularDisplayPipe]
})
export class CurrencyTabularDisplayModule {
}
