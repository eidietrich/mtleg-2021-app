
import { format } from 'd3-format'
import { timeFormat, timeParse } from 'd3-time-format'

// Numeric displays
export const dollarFormat = format('$,.0f')
export const percentFormat = format('.0%')
export const numberFormat = format(',')
export const dateFormat = timeFormat('%-m/%-d/%y')
export const formatTime = timeFormat('%-I:%M %p, %-m/%-d/%y')


// Routing
export const billUrl = identifier => identifier.substring(0,2).toLowerCase() + '-' + identifier.substring(3,)
export const lawmakerUrl = name => name.replace(/\s/g,'-')


// Misc
export const parseDate = timeParse('%Y-%m-%d')
export const capitalize = string => `${string[0].toUpperCase()}${string.slice(1)}`

// Adapted from https://stackoverflow.com/questions/14763997/javascript-array-to-sentence
export const listToText = (list) => {
    if (list.length === 1) {
      return list[0]
    } else {
      return list.slice(0, list.length - 1).join(', ') + ", and " + list.slice(-1);
    } 
  }