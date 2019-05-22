import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(value: string): any {
    if(typeof value == 'string'){
      return value.charAt(0).toUpperCase() + value.substr(1);
    }else{
      return value;
    }
  }

}
