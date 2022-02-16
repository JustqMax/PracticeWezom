import * as $ from 'jquery'


$(document).ready(function() {
    $('.thumbnails img').click(function() {

        var attr = $(this).attr('src');
        var src = $('.main-image  img').attr('src');
        $('.main-image img').attr('src', attr);

    });
    $('img').on('click', function() {
        $('img').attr('id', '');
        $(this).attr('id', 'active')
    });
});