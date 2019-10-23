import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(array: any, texto: string, columna: string): any[] {
    if (!texto) {
      return array;
    }

    return array.filter(item => item[columna].toLowerCase().includes(texto.toLowerCase()));
  }

}
