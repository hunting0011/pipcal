$(document).ready(function () {
    $('input[type=number]').keyup(function () {
        calculateVolumeByPip();
    });

    $('#quotePrice').change(function () {
        calculateVolumeByPip();
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
        let url = 'https://free.currconv.com/api/v7/convert?q=' + symbol + '&compact=ultra&apiKey=9aea9609d8aa855711a8'
        
        $.ajax({
            url: url,
            type: 'GET',
            success: function(data){ 
                // $('#quotePrice').val(data.rates.USD);
                $('#quotePrice').val(data[symbol]);
                $('#quotePrice').trigger("change");
                localStorage.setItem(symbol,data[symbol]);
            },
            error: function(data) {
                let cachedVal = localStorage.getItem(symbol);
                if(cachedVal != null && cachedVal != undefined){
                    $('#quotePrice').val(cachedVal);
                    $('#quotePrice').trigger("change");
                }
            }
        });
    });
});

var calculateVolumeByPip = function () {
    let stoploss = $('#stoploss').val();    
    let stoplossPip = $('#stoplossPip').val();
    let quotePrice = $('#quotePrice').val();
    let quoteSymbol = $('#quoteSymbol').val();

    let volume = quoteSymbol == 'JPY' 
        ? stoploss / (1000 * stoplossPip * quotePrice)
        : stoploss / (10 * stoplossPip * quotePrice);

    $('#volume').text(Number(volume).toFixed(3));

};