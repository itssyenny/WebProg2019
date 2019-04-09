# Comments

## Completeness 100%
All the requirements and bonus features are implemented correctly.

## Coding Quality 80%
In the function *Operation*, the logic is quite complicated and hard to read,
I think it could be divided into some smaller components.

## Correctness 100%
The calculater works fine.

## Parts that I can learn from
* Author use the property of string in javasript to handle the display number, I think this makes things easier.
* Use arrow function in the JSX (onClick = {() => this.funtoin(param)}) to reduce some duplicate code. 

## Room for improvement
* I think the number of states can be reduced, some of the states are not necessary.
* When setting states, it is recommended written as below:
  ```javascript
  this.setState((state, props) => ({
      name: state.name,
      id: state.id
  }))
  ```
  Therefore the program is less prone to error.(In your coding style, you set and get the same thing simultaneously.)
