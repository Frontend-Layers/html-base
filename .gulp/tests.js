// Tests

import mobileFriendlyTest from 'mobile-friendly-test-npm';
import htmlSpeed from 'html-speed';
import cssTest from 'css-test-npm';

import dotenv from 'dotenv';
dotenv.config();

/**
 * Mobile Friendly Test
 */
const mftApiKey = process.env.MFT_KEY || '';
const mftUrl = process.env.PROXY_URL || '';

const mobileTestRes = (done) => {
  mobileFriendlyTest(mftUrl, mftApiKey)
    .then(() => done())
    .catch((error) => {
      console.error(error);
      done(error);
    });
};


/**
 * HTML Speed Test
 */
const hstApiKey = process.env.HST_KEY || '';
const hstUrl = process.env.PROXY_URL || '';

const htmlSpeedRes = (done) => {
  htmlSpeed(hstUrl, hstApiKey)
    .then(() => done())
    .catch((error) => {
      console.error(error);
      done(error);
    });
};


/**
 * CSS Test
 */
const cssUrl = process.env.PROXY_URL || '';

const cssTestRes = (done) => {
  cssTest(cssUrl)
    .then(() => done())
    .catch((error) => {
      console.error(error);
      done(error);
    });
};

export { mobileTestRes, htmlSpeedRes, cssTestRes };
