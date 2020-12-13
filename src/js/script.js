$(document).ready(function(){

    //Modal

    $('[data-modal="consultation"]').on('click', function() {
        $('.overlay, #consultation').fadeIn();
    });

    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #thanks').fadeOut();
    });

    //MaskedInput
    
    $('input[name=phone]').mask("+375(99) 999-99-99");

    //SendToEmail

    $('form').submit( function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #feedback').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');
            $('form').trigger('reset');
        });
        return false;
    });

    //carousel 

    $('.carousel').slick({
        prevArrow: '<button type="button" class="slick-prev"><img src="../img/left.png" alt="left"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="../img/right.png" alt="right"></button>',
        infinite: true,
        slidesToShow: 1,
        adaptiveHeight: true
    });

});