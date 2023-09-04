$(document).ready(function () {
    $('.sd-city-input').keyup(function() {
        if ($(this).val() != '') {
            $('.sd-city-item').hide();
            s = $(this).val();
            s = s.charAt(0).toUpperCase() + s.substr(1);
            $('li:contains("'+s+'")').show();
        } else {
            $('.sd-city-item').show();
        }
    });
});