# Jest

## Installing Jest

```js
npm install --save-dev jest
```

**Add Jest in package.json**
```js
  "scripts": {
    "test": "jest"
  },
```

**Runs Jest with watch mode.**
```js
npm run test -- --watch
```
## Troublueshooting - "Requires Babel 7.0.0 but was loaded with 6.26.3...
>Error: Requires Babel “7.0.0-0” but was loaded with “6.26.3”

**Solution**
The Jest official website tells how to fix the issue. [Here](https://jestjs.io/docs/en/getting-started#using-babel) is the link. 
We have to install `babel-jest`, `babel-core@^7.0.0-bridge.0` and `@babel/core`. I installed them with devDependencies with below command.

```js
npm install babel-jest babel-core@^7.0.0-bridge.0 @babel/core --save-dev
```


## Jest API

- `test(name, fn)`
- `expect(value).toBe()`
- `expect(value).toEqual()` - for an object
- `expect(value).any(String)` - for dynamic value ex. id


```js
{} === {}
//false
[] === []
// false
```

## Test Reducer with Jest
[Test file for department reducer](./src/client/reducers/departments.js)

## References:
- [Jest official site](https://jestjs.io/)
- [Stackoverflow - Jest install error](https://stackoverflow.com/questions/46220674/jest-typeerror-path-must-be-a-string-received-undefined
)