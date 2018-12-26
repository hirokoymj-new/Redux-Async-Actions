const add = (a, b) => a + b;
const greeting = (name) =>{
  return `Hello ${name}!`;
}

test('should add two numbers', () => {
  const result = add(1, 1);
  expect(result).toBe(2);
});
test('greeting test', ()=>{
  const result = greeting('Mike');
  expect(result).toBe('Hello Mike!');
})
