const exampleFunction = (param1, param2) => {
  const localVar = 'Hello';

  if (param1 && param2) {
    console.log(localVar + ' ' + param1 + ' ' + param2);
  }

  const complexObject = {
    key1: 'value1',
    key2: 'value2'
  };

  return complexObject;
};

class TestClass {

  constructor(name) {
    this.name = name;
  }

  testMethod() {
    return `Method called for ${this.name}`;
  }

}

export { exampleFunction, TestClass };
