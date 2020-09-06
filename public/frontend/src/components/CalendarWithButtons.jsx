import React, { Suspense, Component } from "react";
import moment from 'moment';
import {
    Card,
    Button
} from "antd";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "react-modern-calendar-datepicker";
import './CalendarWithButtons.css'
class CalendarMenu extends Component {
    constructor(props) {
        super(props);
        // const fadeAnim = useRef(new Animated.Value(0)).current
        this.fillerRef = React.createRef();
    }

    componentDidMount() {
        const filler = this.fillerRef.current;
        filler.classList.toggle('filled');
    }
    render() {
        return (
            <div>
                <div className='calendar' ref={this.fillerRef}></div>
                <Card style={{ position: "relative" }}>
                    <Button style={{ position: 'absolute', width: '30px', height: '30px', top: '20px', right: '20px', cursor: 'pointer' }} onClick={this.props.onExit}>X</Button>
                    <p>Здесь будут предпочтения</p>
                    <p>на этот день</p>
                    <Button>Создать предпочтение</Button>
                </Card>
            </div>

        )
    }
}

const lastDate = moment(new Date().setMonth(new Date().getMonth() + 0))
class CalendarWithButtons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMenu: false
        }
    }
    componentDidMount() {

    }

    render() {
      const myCustomLocale = {
        // months list by order
        months: [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
        ],
      
        // week days by order
        weekDays: [
          
          {
            name: 'Понедельник',
            short: 'Пн',
          },
          {
            name: 'Вторник',
            short: 'Вт',
          },
          {
            name: 'Среда',
            short: 'Ср',
          },
          {
            name: 'Четверг',
            short: 'Чт',
          },
          {
            name: 'Пятница',
            short: 'Пт',
          },
          {
            name: 'Суббота',
            short: 'Сб',
            isWeekend: true,
          },
          {
            name: 'Воскресенье', // used for accessibility 
            short: 'Вс', // displayed at the top of days' rows
            isWeekend: true, // is it a formal weekend or not?
          },
        ],
      
        // just play around with this number between 0 and 6
        weekStartingIndex: 6,
      
        // return a { year: number, month: number, day: number } object
        getToday(gregorainTodayObject) {
          return gregorainTodayObject;
        },
      
        // return a native JavaScript date here
        toNativeDate(date) {
          return new Date(date.year, date.month - 1, date.day);
        },
      
        // return a number for date's month length
        getMonthLength(date) {
          return new Date(date.year, date.month, 0).getDate();
        },
      
        // return a transformed digit to your locale
        transformDigit(digit) {
          return digit;
        },
      
        // texts in the date picker
        nextMonth: 'Следующий месяц',
        previousMonth: 'Предыдущий месяц',
        openMonthSelector: 'Открыть выбор месяца',
        openYearSelector: 'Открыть выбор года',
        closeMonthSelector: 'Закрыть выбор месяца',
        closeYearSelector: 'Закрыть выбор года',
        defaultPlaceholder: 'Выбрать...',
      
        // for input range value
        from: 'с',
        to: 'до',
      
      
        // used for input value when multi dates are selected
        digitSeparator: ',',
      
        // if your provide -2 for example, year will be 2 digited
        yearLetterSkip: 0,
      
        // is your language rtl or ltr?
        // isRtl: false,
      }
      let days = this.props.highlighted;
      if (days) {
        days.forEach(day => {
          day.className = 'workDay'
        });
      }
      console.log('дни ' + days)
        return (
            <div>
                {this.state.isMenu ? <CalendarMenu onExit={() => { this.setState({ isMenu: false }) }} /> : <Calendar locale={myCustomLocale} calendarClassName='responsive-calendar' customDaysClassName={days} onChange={() => { this.setState({ isMenu: true }); console.log('Date picked') }} />}
            </div>
        )
    }
}

export default CalendarWithButtons;