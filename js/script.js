document.addEventListener('DOMContentLoaded', () => {
  $(function() {
    $("#datepicker").datepicker({ inline: true });
  });

  $( function() {
    $("input[type='checkbox']").checkboxradio();
  } );
})

