import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {

  transform(inputDateStr: string): any {
  var  inputDate=new Date(inputDateStr);
 var outputDate= inputDate.getDate()+"/"+(inputDate.getMonth()+1) +"/"+inputDate.getFullYear()
    return outputDate;
  }

}
