// Tests

import mobileFriendlyTest from 'mobile-friendly-test-npm'
import htmlSpeed from 'html-speed'
import cssTest from 'css-test-npm'

import dotenv from 'dotenv';
dotenv.config();

/**
 * Mobile Friendly Test
 */
const mftApiKey = process.env.MFT_KEY || '';
const mftUrl = process.env.PROXY_URL || '';
const mobileTestRes = () =>
  mobileFriendlyTest(mftUrl, mftApiKey)


/**
 * HTML Speed Test
 */
const hstApiKey = process.env.HST_KEY || '';
const hstUrl = process.env.PROXY_URL || '';
const htmlSpeedRes = () =>
  htmlSpeed(hstUrl, hstApiKey)


/**
 * CSS Test
 */
const cssUrl = process.env.PROXY_URL || '';
const cssTestRes = () => cssTest(cssUrl)

export { mobileTestRes, htmlSpeedRes, cssTestRes }
