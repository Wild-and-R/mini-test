function isPrime(n) {
  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  for (let i = 3; i <= Math.sqrt(n); i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}

const results = [];

for (let n = 100; n >= 1; n--) {
  if (isPrime(n)) continue;
  else if (n % 15 === 0) results.push("FooBar");
  else if (n % 3 === 0) results.push("Foo");
  else if (n % 5 === 0) results.push("Bar");
  else results.push(String(n));
}

console.log(results.join(", "));