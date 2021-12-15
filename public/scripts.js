$(function () {
  $('body').on('keyup keydown cut paste change focus drop', '.form-control', function () {
    if ($(this).val().length !== 0) {
      $(this).closest('.form-group').addClass('show-label')
    } else {
      $(this).closest('.form-group').removeClass('show-label')
    }
  })
})
