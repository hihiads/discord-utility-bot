function l(x) {return console.log(x)}

const spacetime = require('spacetime')
const humanIntervalToDate = require( 'date.js' )

let johnsRequest = "!schedule lobby today at 10am".split( ' ' ).slice( 2, 5 ).join( ' ' )
let lucasRequest = "!schedule lobby today at 3pm".split( ' ' ).slice( 2, 5 ).join( ' ' )
johnsTime = johnsRequest.split( ' ' )[2]
lucasTime = lucasRequest.split( ' ' )[2]

let serverRegion = "Etc/UTC"
let johnsRegion = "America/New_York"
let lucasRegion = "Europe/Berlin"

johnsServerTime = humanIntervalToDate(johnsRequest)
lucasServerTime = humanIntervalToDate(lucasRequest)

johnsEpoch = spacetime( johnsServerTime, johnsRegion ).time( johnsTime )
lucasEpoch = spacetime( lucasServerTime, lucasRegion ).time(lucasTime)

l( johnsEpoch )
l( lucasEpoch )