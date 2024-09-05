import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getMode',
  standalone: true
})
export class GetModePipe implements PipeTransform {

  transform(value: number): string {
    if (value === 1) {
      return "face";
    }
    else {
      if (value === 2)
        return "computer";
    }

    return 'computer';
  }

}



