var smartypants = require('retext-smartypants');
var Retext = require('retext');
var retext;
var options = {};

var inputElement = document.getElementsByTagName('textarea')[0];
var formElement = document.getElementsByTagName('form')[0];
var outputElement = document.getElementsByTagName('textarea')[1];

var quotesElement = document.getElementsByName('quotes')[0];
var ellipsesElement = document.getElementsByName('ellipses')[0];
var dashesElement = document.getElementsByName('dashes')[0];
var backticksElement = document.getElementsByName('backticks')[0];

function makeSmarter(value) {
    outputElement.value = retext.parse(value).toString();
}

function oncheckboxchange(event) {
    options[event.target.name] = event.target.checked;
}

function onselectchange(event) {
    var value = event.target.selectedOptions[0];

    if (!value) {
        return;
    }

    value = value.value;

    if (value === 'true') {
        value = true;
    } else if (value === 'false') {
        value = false;
    }

    options[event.target.name] = value;
}

quotesElement.addEventListener('change', oncheckboxchange);
ellipsesElement.addEventListener('change', oncheckboxchange);
dashesElement.addEventListener('change', onselectchange);
backticksElement.addEventListener('change', onselectchange);

backticksElement.addEventListener('change', function () {
    if (options.backticks === 'all' && options.quotes) {
        quotesElement.checked = false;
        options.quotes = false
    }
})

quotesElement.addEventListener('change', function () {
    if (options.backticks === 'all' && options.quotes) {
        backticksElement.selectedIndex = 1;
        options.backticks = true;
    }
})

function onanychange() {
    retext = new Retext().use(smartypants(options));
    makeSmarter(inputElement.value);
}

quotesElement.addEventListener('change', onanychange);
ellipsesElement.addEventListener('change', onanychange);
dashesElement.addEventListener('change', onanychange);
backticksElement.addEventListener('change', onanychange);

inputElement.addEventListener('input', function (event) {
    makeSmarter(inputElement.value);
});

oncheckboxchange({'target' : quotesElement});
oncheckboxchange({'target' : ellipsesElement});
onselectchange({'target' : dashesElement});
onselectchange({'target' : backticksElement});
onanychange();
