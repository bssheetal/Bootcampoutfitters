var expect = require("chai").expect;

function multiply(x, y) {
  if (typeof x !== 'number' || typeof y !== 'number') {
     
  } else {
    return x * y;
  };
};

describe("canary test", function() {
  // A "canary" test is one we set up to always pass
  // This can help us ensure our testing suite is set up correctly before writing real tests
  it("should pass this canary test", function() {
    expect(true).to.be.true;
  });
});
describe("Multiply", function() {
  // A "canary" test is one we set up to always pass
  // This can help us ensure our testing suite is set up correctly before writing real tests
  it("should multiply 2 numbers", function() {
    expect(nultiply(2, 4)).to.equal(8);
  });

  it("", function() {
    expect(function() {
      expect();
    });
  });
});
