const myFunctions = require('../app');
const assert = require('chai').assert;
const sinon = require("sinon");

// myFunctions.sampleApp(false);

describe('URL check', function() {

    it('ConstructUrl', function() {
        let URL = "https://resttest.bench.co/transactions/";
        const expect = "https://resttest.bench.co/transactions/1.json";
        const obs1 =  myFunctions.constructURL(URL, 1);
        const obs2 =  myFunctions.constructURL(URL, 0);
        assert.equal(expect, obs1);
        assert.equal("", obs2);
    });
    it('calculateRunningSum', function() {
        let spy = sinon.spy(console, 'log');
        let myMap = new Map([]);
        myMap.set('b',10);
        myMap.set('a',-2);

        myFunctions.calculateRunningSum(myMap);
        const expected = ["1. a:-2","2. b:8.00"]
        var args = spy.args;
        for (let i = 0; i < expected.length; i++) {
            assert.equal(args[i],expected[i]); 
          }
        spy.restore();
    });
    it('gatherData', async () => {
        const expected = "https://resttest.bench.co/transactions/";
        const map = await myFunctions.gatherData(expected);
        assert.equal(map.size,10);

        const faked ="https://resttest.bench.co/transac"
        const zer0Map = await myFunctions.gatherData(faked);
        assert.equal(zer0Map.size,0);
    });
});



