const fetch = require('node-fetch');

// constructs url full link with page number
function constructURL(url, pageNumber) {
    if(pageNumber>=1) {
        return url+pageNumber.toString()+".json";
    }
    return "";
}

// sort acc date
// calculate running sum based on sorted date
// print on console
function calculateRunningSum(costMap) {

    let keys=[...costMap.keys()];
    let skeys = keys.sort();

    console.log("1. "+skeys[0]+":"+costMap.get(skeys[0]));
    for (let k=1;k<skeys.length;++k){
        const runningSum = Number(costMap.get(skeys[k])) + Number(costMap.get(skeys[k-1]));
        costMap.set(skeys[k],parseFloat(runningSum).toFixed(2));
        console.log((k+1)+". "+skeys[k]+":"+costMap.get(skeys[k]))
    }

}

// create HTTP request
// send requests and return map
async function gatherData(url) {
    let costMap = new Map([]);
    let objectCount = 0;
    let breaker = true;
    let pageCount = 1;
    while (breaker) {
        const validURL = constructURL(url,pageCount);
        const response = await fetch(validURL, {method: 'GET'});
        if (response.status==200) {
            const jsonData = await response.json();
            for(let i in jsonData.transactions) {
                let k = jsonData.transactions[i];
                let date = k['Date'];
                let amount = Number(k['Amount']);
                if (costMap.has(date)) {
                    let currAmt = Number(costMap.get(date));
                    costMap.set(k['Date'], Number(currAmt+amount));
                }
                else {
                    costMap.set(k['Date'], Number(amount));
                }
            }
            objectCount++; 
            breaker = true;
        }
        else {
            breaker = false;
        }
        pageCount++;
    }
    return costMap;
}

async function sampleApp(runAlways) {
    if (runAlways === 'true') {
        let URL = "https://resttest.bench.co/transactions/";
        const costMap = await gatherData(URL);
        console.log("Number of Days to show running Balance: "+costMap.size);
        calculateRunningSum(costMap);
    }
}
const myArgs = process.argv.slice(2);

sampleApp(myArgs[0]);

module.exports = {
    constructURL,
    calculateRunningSum,
    gatherData
};
