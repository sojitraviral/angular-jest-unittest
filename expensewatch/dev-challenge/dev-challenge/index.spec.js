var currencyArr = [];
var arrIndex = {};

function populateArray(object) {
  var index = arrIndex[object.name];
  if(index === undefined) {
    index = currencyArr.length;
  }
  arrIndex[object.name] = index;
  currencyArr[index] = object;

  currencyArr.sort(compare);
}

function compare(a, b) {
  var nameA = a.lastChangeBid;
  var nameB = b.lastChangeBid;
  var comparison = 0;
  if (nameA > nameB) {
    comparison = 1;
  } else if (nameA < nameB) {
    comparison = -1;
  }
  return comparison;
}

function calcmidprice(bestBid, bestAsk) {
  return (bestBid + bestAsk) / 2;
}

/*------------  Unit Test Cases ---------------*/
test('calcmidprice()', function() {
  result = calcmidprice(2, 2);
  expect(result).toEqual(2);
});

test('populateArray()', function() {
  var obj = {name: "eurcad", bestBid: 1.448565611308355, bestAsk: 1.455055272973616, openBid: 1.394018471370461, openAsk: 1.448781528629539,lastChangeAsk: -0.003575488919750569, lastChangeBid :0.026764284665523608};
  populateArray(obj);
  expect(currencyArr.length).toEqual(1);
});

test('compare()', function() {
  currencyArr = [];

  currencyArr.push({name: "eurcad", bestBid: 1.448565611308355, bestAsk: 1.455055272973616, openBid: 1.394018471370461, openAsk: 1.448781528629539,lastChangeAsk: -0.003575488919750569, lastChangeBid :0.026764284665523608});
  currencyArr.push({name: "usdjpy", bestBid: 106.64430120986003, bestAsk: 107.14324226830459, openBid: 108.12754102178181, openAsk: 108.88245897821818,lastChangeAsk: -3.3605763420790282, lastChangeBid: -1.6230200809899742});

  currencyArr.sort(compare);

  expect(currencyArr[0].lastChangeBid).toEqual(-1.6230200809899742);
});
