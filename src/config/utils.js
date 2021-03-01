
import { format } from 'd3-format'
import { timeFormat, timeParse } from 'd3-time-format'

// Numeric displays
export const dollarFormat = format('$,.0f')
export const percentFormat = format('.0%')
export const numberFormat = format(',')
export const dateFormat = timeFormat('%-m/%-d/%y')
export const formatTime = timeFormat('%-I:%M %p, %-m/%-d/%y')
export const formatTimeLong = timeFormat('%-I:%M %p %b %-d, %Y')
export const dateFormatLong = timeFormat('%B %-d')
export const dateFormatWithWeekday = timeFormat('%A, %B %-d')
export const shortDateWithWeekday = timeFormat('%a, %b %-d')


// Routing
export const billUrl = identifier => identifier.substring(0,2).toLowerCase() + '-' + identifier.substring(3,)
export const lawmakerUrl = name => name.replace(/\s/g,'-')
export const committeeUrl = name => name.replace(/\s/g,'-').replace(/\,/g,'')

// Misc
export const parseDate = timeParse('%Y-%m-%d')
export const capitalize = string => `${string[0].toUpperCase()}${string.slice(1)}`
// Adapted from https://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript
export const titleCase = string => string.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
  .replace('Mt','MT') // for addresses
export const cleanPhoneString = string => string.replace(/\s|\-|\(|\)/g,'')


// Adapted from https://stackoverflow.com/questions/14763997/javascript-array-to-sentence
export const listToText = (list) => {
    if (list.length === 1) {
      return list[0]
    } else if (list.length === 2) {
      return `${list[0]} and ${list[1]}`
    } else {
      return `${list.slice(0, list.length - 1).join(', ')}, and ${list.slice(-1)}`
    } 
  }