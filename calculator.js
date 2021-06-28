$(document).ready(function () {
    $('input[type=number]').keyup(function () {
        calculateVolume();
    });

    $('#quotePrice').change(function () {
        calculateVolume();
    });

    $('#quoteSymbol').change(function () {
        let quoteSymbol = $('#quoteSymbol').val();
        if (quoteSymbol == 'USD') {
            $('#quotePrice').val(1);
            $('#quotePrice').trigger("change");
            return;
        }

        // let url = 'https://api.exchangeratesapi.io/latest?symbols=USD&base='+ quoteSymbol;
        let symbol = quoteSymbol + '_USD';
        let url = 'https://free.currconv.com/api/v7/convert?q=' + symbol + '&compact=ultra&apiKey=36c60fab2348765fb4cb'

        $.get(url, function (data) {
            // $('#quotePrice').val(data.rates.USD);
            $('#quotePrice').val(data[symbol]);
            $('#quotePrice').trigger("change");
        });
    });
});

var calculateVolume = function () {
    let stoploss = $('#stoploss').val();
    let stoplossPrice = $('#stoplossPrice').val();
    let entryPrice = $('#entryPrice').val();
    let quotePrice = $('#quotePrice').val();

    let volume = stoploss / (100000 * (entryPrice - stoplossPrice) * quotePrice);

    $('#volume').text(Number(volume).toFixed(3));

};