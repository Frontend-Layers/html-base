/**
 * Module Class
 */

export default class ModuleClass {

  constructor() {
    this.methodString = 'string';
    this.methodNumber = 0;
  }

  method() {
    console.log('Class Render');
  }

}

/**
 * ESLinter test
 */
const name = 'James';
const person = { first: name };
console.log(person);
const sayHelloLinting = (fName) => {
  console.log(`Hello linting, ${fName}`);
};
