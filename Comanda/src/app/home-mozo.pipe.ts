import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'homeMozo',
  standalone: true
})
export class HomeMozoPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
