/**
 * Dependencies.
 */

var Retext = require('wooorm/retext@0.4.0');
var smartypants = require('wooorm/retext-smartypants@0.4.1');

/**
 * Retext.
 */

var retext;
var options = {};

/**
 * DOM elements.
 */

var $input = document.getElementsByTagName('textarea')[0];
var $output = document.getElementsByTagName('textarea')[1];

var $quotes = document.getElementsByName('quotes')[0];
var $ellipses = document.getElementsByName('ellipses')[0];
var $dashes = document.getElementsByName('dashes')[0];
var $backticks = document.getElementsByName('backticks')[0];

/**
 * Event handlers
 */

function oninputchange() {
    smarten();
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

function onbacktickschange() {
    if (options.backticks === 'all' && options.quotes) {
        $quotes.checked = false;

        options.quotes = false
    }
}

function onquoteschange() {
    if (options.backticks === 'all' && options.quotes) {
        $backticks.selectedIndex = 1;

        options.backticks = true;
    }
}

function onanyoptionchange() {
    retext = new Retext().use(smartypants, options);

    smarten();
}

/**
 * Smarten input.
 */

function smarten(value) {
    retext.parse($input.value, function (err, tree) {
        if (err) throw err;

        $output.value = tree;
    });
}

/**
 * Attach event handlers.
 */

$quotes.addEventListener('change', oncheckboxchange);
$ellipses.addEventListener('change', oncheckboxchange);
$dashes.addEventListener('change', onselectchange);
$backticks.addEventListener('change', onselectchange);

$quotes.addEventListener('change', onquoteschange);
$backticks.addEventListener('change', onbacktickschange);

$quotes.addEventListener('change', onanyoptionchange);
$ellipses.addEventListener('change', onanyoptionchange);
$dashes.addEventListener('change', onanyoptionchange);
$backticks.addEventListener('change', onanyoptionchange);

$input.addEventListener('input', smarten);

/**
 * Provide initial answer.
 */

oncheckboxchange({'target' : $quotes});
oncheckboxchange({'target' : $ellipses});
onselectchange({'target' : $dashes});
onselectchange({'target' : $backticks});

onanyoptionchange();
