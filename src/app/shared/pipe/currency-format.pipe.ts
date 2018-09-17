import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Pipe({
  name: 'currencyFormat'
})
export class CurrencyFormatPipe implements PipeTransform {
    transform(value: number, locale: string, currency_symbol: boolean, number_format: string = '1.2-2'): string {
        if (value) {

            const currencyPipe = new CurrencyPipe(locale);
            let new_value: string;

            new_value = currencyPipe.transform(value, locale);
            if (locale = 'R$') {
                new_value = new_value.replace('.', '|').replace(',', '.').replace('|', ',').replace('BRL', 'R$');
            }

            return new_value;
        } else {
            return 'R$ 0';
        }
    }
}
