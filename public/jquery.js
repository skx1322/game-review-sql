$(document).ready(function(){
    $('a').hover(
        function() {
            $(this).css('font-size', 'calc(var(--font-size-md) * 1.05)'); // Increase font size by 10%
        },
        function() {
            $(this).css('font-size', 'var(--font-size-md)'); // Reset to original font size
        }
    );
});

$('input[type="submit"]').val('Confirm');

$(document).ready(function () {
    const rating = parseFloat($('.rating-number').text());
    const maxRating = 10;
    const circleCircumference = 283; // Full circumference

    // Calculate stroke-dashoffset based on the rating
    const offset = circleCircumference * (1 - rating / maxRating);

    // Animate the circle
    $('.circle-fg').css('stroke-dashoffset', offset);
});
