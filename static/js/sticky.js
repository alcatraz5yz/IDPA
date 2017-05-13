$('.header').sticky({
  getWidthFrom: '.container',
  responsiveWidth: true
});

// $('.header').on('sticky-start', function () {
//   $('.description').html('We build <strong>great</strong> apps');
// });

// $('.header').on('sticky-end', function () {
//   $('.description').html('We build apps');
// });

$('.index').sticky({
  topSpacing: 60,
  // getWidthFrom: '.container',
  responsiveWidth: true
});


// $('.index').on('sticky-start', function() {
//   $(this).append(' <a href="mailto:email@website.com" class="email-text">Email&nbsp;us</a>');
// });



// $('.index').on('sticky-end', function() {
//     $('.email-text').remove();
// });
