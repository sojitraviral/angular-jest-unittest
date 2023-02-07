/**
 * This javascript file will constitute the entry point of your solution.
 *
 * Edit it as you need.  It currently contains things that you might find helpful to get started.
 */

// This is not really required, but means that changes to index.html will cause a reload.
require('./site/index.html')
// Apply the styles in style.css to the page.
require('./site/style.css')

// if you want to use es6, you can do something like
//     require('./es6/myEs6code')
// here to load the myEs6code.js file, and it will be automatically transpiled.

// Change this to get detailed logging from the stomp library
global.DEBUG = false

var url = "ws://localhost:8011/stomp";
var client = Stomp.client(url);
var subscription;
var currencyArr = [];
var arrIndex = {};

var usdjpy_midpr = [];
var gbpjpy_midpr = [];
var eurcad_midpr = [];
var eurjpy_midpr = [];
var euraud_midpr = [];
var gbpaud_midpr = [];
var gbpeur_midpr = [];
var eurchf_midpr = [];
var gbpchf_midpr = [];
var gbpusd_midpr = [];
var usdeur_midpr = [];
var gbpcad_midpr = [];

client.debug = function(msg) {
  if (global.DEBUG) {
    console.info(msg)
  }
}

function connectCallback() {
  document.getElementById('stomp-status').innerHTML = "It has now successfully connected to a stomp server serving price updates for some foreign exchange currency pairs.";

  subscription = client.subscribe("/fx/prices", callback);
  function callback (message) {
    if (message.body) {
      var odata = JSON.parse(message.body);
      populateArray(odata);
      drawTable();
    } else {
      alert("got empty message");
    }
  }
}

client.connect({}, connectCallback, function(error) {
  alert(error.headers.message)
})

function populateArray(object) {
  var index = arrIndex[object.name];
  if(index === undefined) {
    index = currencyArr.length;
  }
  arrIndex[object.name] = index;
  currencyArr[index] = object;

  currencyArr.sort(compare);
  }

function drawTable() {
  var tableRef = document.getElementById('tblStock').getElementsByTagName('tbody')[0];
  var tblDel = document.getElementById("tblStock");
  var tr = tblDel.getElementsByTagName("tr");
  var rowCnt = 0;

  currencyArr.map(function(item) {

    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue === item.name) {
          tblDel.deleteRow(i)
        }
      }       
    }

    var row = tableRef.insertRow(rowCnt);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    cell1.innerHTML = item.name;
    cell2.innerHTML = item.bestBid;
    cell3.innerHTML = item.bestAsk;
    cell4.innerHTML = item.lastChangeBid;
    cell5.innerHTML = item.lastChangeAsk;
    cell6.innerHTML = '<span id="sparkline-' + item.name +'"></span>';
    populateMidPriceArr(item.name, item.bestBid, item.bestAsk);
    rowCnt++;
  });
}

function populateMidPriceArr(symbol, bestBid, bestAsk) {
  switch(symbol) {
    case 'usdjpy':
      var sparkline = new Sparkline(document.getElementById("sparkline-usdjpy"));
      usdjpy_midpr.push(calcmidprice(bestBid, bestAsk));
      if(usdjpy_midpr.length > 50){ usdjpy_midpr.shift();}
      sparkline.draw(usdjpy_midpr);
      break;
    case 'gbpjpy':
      var sparkline = new Sparkline(document.getElementById("sparkline-gbpjpy"));
      gbpjpy_midpr.push(calcmidprice(bestBid, bestAsk));
      if(gbpjpy_midpr.length > 50){ gbpjpy_midpr.shift();}
      sparkline.draw(gbpjpy_midpr);
      break;
    case 'eurcad':
      var sparkline = new Sparkline(document.getElementById("sparkline-eurcad"));
      eurcad_midpr.push(calcmidprice(bestBid, bestAsk));
      if(eurcad_midpr.length > 50){ eurcad_midpr.shift();}
      sparkline.draw(eurcad_midpr);
      break;
    case 'eurjpy':
      var sparkline = new Sparkline(document.getElementById("sparkline-eurjpy"));
      eurjpy_midpr.push(calcmidprice(bestBid, bestAsk));
      if(eurjpy_midpr.length > 50){ eurjpy_midpr.shift();}
      sparkline.draw(eurjpy_midpr);
      break;
    case 'euraud':
      var sparkline = new Sparkline(document.getElementById("sparkline-euraud"));
      euraud_midpr.push(calcmidprice(bestBid, bestAsk));
      if(euraud_midpr.length > 50){ euraud_midpr.shift();}
      sparkline.draw(euraud_midpr);
      break;
    case 'gbpaud':
      var sparkline = new Sparkline(document.getElementById("sparkline-gbpaud"));
      gbpaud_midpr.push(calcmidprice(bestBid, bestAsk));
      if(gbpaud_midpr.length > 50){ gbpaud_midpr.shift();}
      sparkline.draw(gbpaud_midpr);
      break;
    case 'gbpeur':
      var sparkline = new Sparkline(document.getElementById("sparkline-gbpeur"));
      gbpeur_midpr.push(calcmidprice(bestBid, bestAsk));
      if(gbpeur_midpr.length > 50){ gbpeur_midpr.shift();}
      sparkline.draw(gbpeur_midpr);
      break;
    case 'eurchf':
      var sparkline = new Sparkline(document.getElementById("sparkline-eurchf"));
      eurchf_midpr.push(calcmidprice(bestBid, bestAsk));
      if(eurchf_midpr.length > 50){ eurchf_midpr.shift();}
      sparkline.draw(eurchf_midpr);
      break;
    case 'gbpchf':
      var sparkline = new Sparkline(document.getElementById("sparkline-gbpchf"));
      gbpchf_midpr.push(calcmidprice(bestBid, bestAsk));
      if(gbpchf_midpr.length > 50){ gbpchf_midpr.shift();}
      sparkline.draw(gbpchf_midpr);
      break;
    case 'gbpusd':
      var sparkline = new Sparkline(document.getElementById("sparkline-gbpusd"));
      gbpusd_midpr.push(calcmidprice(bestBid, bestAsk));
      if(gbpusd_midpr.length > 50){ gbpusd_midpr.shift();}
      sparkline.draw(gbpusd_midpr);
      break;
    case 'usdeur':
      var sparkline = new Sparkline(document.getElementById("sparkline-usdeur"));
      usdeur_midpr.push(calcmidprice(bestBid, bestAsk));
      if(usdeur_midpr.length > 50){ usdeur_midpr.shift();}
      sparkline.draw(usdeur_midpr);
      break;
    case 'gbpcad':
      var sparkline = new Sparkline(document.getElementById("sparkline-gbpcad"));
      gbpcad_midpr.push(calcmidprice(bestBid, bestAsk));
      if(gbpcad_midpr.length > 50){ gbpcad_midpr.shift();}
      sparkline.draw(gbpcad_midpr);
      break;
  }
  sparkline = null;
}

function calcmidprice(bestBid, bestAsk) {
  return (bestBid + bestAsk) / 2;
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

var exampleSparkline = document.getElementById('example-sparkline')
Sparkline.draw(exampleSparkline, [1, 2, 3, 6, 8, 20, 2, 2, 4, 2, 3])
