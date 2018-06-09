import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';

export interface CalendarDate {
  mDate: moment.Moment;
  selected?: boolean;
  today?: boolean;
  showEvent: boolean;
}

@Component({
  selector: 'app-calendario-permessi-dipendente',
  templateUrl: './calendario-permessi-dipendente.component.html',
  styleUrls: ['./calendario-permessi-dipendente.component.scss']
})
export class CalendarioPermessiDipendenteComponent implements OnInit, OnChanges {

  currentDate = moment();
  dayNames = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'];
  weeks: CalendarDate[][] = [];
  sortedDates: CalendarDate[] = [];

  @Input() selectedDates: CalendarDate[] = [];
  @Output() onSelectDate = new EventEmitter<CalendarDate>();

  constructor() {
    this.currentDate.locale("it");
    //console.log(this.currentDate.weekdays(true));
  }

  ngOnInit(): void {
    this.generateCalendar();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedDates &&
        changes.selectedDates.currentValue &&
        changes.selectedDates.currentValue.length  > 1) {
      // sort on date changes for better performance when range checking
      this.sortedDates = _.sortBy(changes.selectedDates.currentValue, (m: CalendarDate) => m.mDate.valueOf());
      this.generateCalendar();
    }
  }

  // date checkers
  isToday(date: moment.Moment): boolean {
    return moment().isSame(moment(date), 'day');
  }

  isSelected(date: moment.Moment): boolean {
    return _.findIndex(this.selectedDates, (selectedDate) => {
      return moment(date).isSame(selectedDate.mDate, 'day');
    }) > -1;
  }

  isSelectedMonth(date: moment.Moment): boolean {
    return moment(date).isSame(this.currentDate, 'month');
  }

  selectDate(date: CalendarDate): void {
    this.onSelectDate.emit(date);
  }

  // actions from calendar
  prevMonth(): void {
    this.currentDate = moment(this.currentDate).subtract(1, 'months');
    this.generateCalendar();
  }

  nextMonth(): void {
    this.currentDate = moment(this.currentDate).add(1, 'months');
    this.generateCalendar();
  }

  firstMonth(): void {
    this.currentDate = moment(this.currentDate).startOf('year');
    this.generateCalendar();
  }

  lastMonth(): void {
    this.currentDate = moment(this.currentDate).endOf('year');
    this.generateCalendar();
  }

  prevYear(): void {
    this.currentDate = moment(this.currentDate).subtract(1, 'year');
    this.generateCalendar();
  }

  nextYear(): void {
    this.currentDate = moment(this.currentDate).add(1, 'year');
    this.generateCalendar();
  }

  // generate the calendar grid
  generateCalendar(): void {
    const dates = this.fillDates(this.currentDate);
    const weeks: CalendarDate[][] = [];
    while (dates.length > 0) {
      weeks.push(dates.splice(0, 7));
    }
    this.weeks = weeks;
  }

  fillDates(currentMoment: moment.Moment): CalendarDate[] {
    const firstOfMonth = moment(currentMoment).startOf('month').day();
    const firstDayOfGrid = moment(currentMoment).startOf('month').subtract(firstOfMonth, 'days');
    const start = firstDayOfGrid.date();
    return _.range(start, start + 42)
            .map((date: number): CalendarDate => {
              const d = moment(firstDayOfGrid).date(date);
              return {
                today: this.isToday(d),
                selected: this.isSelected(d),
                mDate: d,
                showEvent: this.getClasses(d)
              };
            });
  }

  getClasses(mDate, eventMap={}){
    //mock
    eventMap = {
      '2018-07-26': true,
      '2018-07-27': true,
      '2018-07-28': true,
      '2018-07-29': true,
      '2018-07-30': true,
      '2018-07-31': true,
      '2018-08-01': true,
      '2018-08-02': true,
    }

    var currentCalendarDate = this.formatDate(mDate._d.getDate(), mDate._d.getMonth(), mDate._d.getFullYear());
    return eventMap[currentCalendarDate]===undefined ? false: true;
  }
  formatDate(day, month, year){    
    //fix month start from 0
    month = month + 1;
    day = day < 9 ? "0" + day : day;
    month = month < 9 ? "0" + month : month;
    return year + "-" + month + "-" + day;
  }
  
}