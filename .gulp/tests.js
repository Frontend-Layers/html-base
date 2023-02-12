// Misc


import mobileFriendlyTest from 'mobile-friendly-test-npm'
import htmlSpeed from 'html-speed'
import cssTest from 'css-test-npm'

let apiKey = ''
let url = ''
const mobileTestRes = () =>
  mobileFriendlyTest(url, apiKey)


apiKey = ''
url = ''
const htmlSpeedRes = () =>
  htmlSpeed(url, apiKey)


url = ''
const cssTestRes = () => cssTest(url)

export { mobileTestRes, htmlSpeedRes, cssTestRes }
