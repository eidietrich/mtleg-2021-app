
import { format } from 'd3-format'
import { timeFormat, timeParse } from 'd3-time-format'

// Numeric displays
export const dollarFormat = format('$,.0f')
export const percentFormat = format('.0%')
export const numberFormat = format(',')
export const dateFormat = timeFormat('%m/%d/%y')


// Routing
export const billUrl = identifier => identifier.substring(0,2).toLowerCase() + '-' + identifier.substring(3,)

// Misc
export const parseDate = timeParse('%Y-%m-%d')
export const capitalize = string => `${string[0].toUpperCase()}${string.slice(1)}`