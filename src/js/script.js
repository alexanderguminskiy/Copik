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

});