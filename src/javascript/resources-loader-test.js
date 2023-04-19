/**
 * Module
 */

import testJsonData from 'root/src/json/test.json';
import testTemplate from 'root/src/javascript/res/test-template.html';
import svg from 'root/src/javascript/res/dummy.svg';

const ResourcesLoaderTest = () => {

  console.log('testJsonData', testJsonData);
  console.log('SVG Loading test', svg);
  console.log('testTemplate', testTemplate);

  // tpl.push(testTemplate, 'placeholder');
  // tpl.init(testTemplate, 'component name');
  // tpl.render(testTemplate, 'placeholder');

};

export default ResourcesLoaderTest;
