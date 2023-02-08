const responsive_grid_table = () => {
  const $table = $('.table-wrapper--columnize');
  if($table.length < 1) return;

  const headers = $table.find('thead th').map( (i, v) => {
    return v.innerText;
  });

  const rows = $table.find('tbody tr').map( (i, v) => {
    $(v).find('th,td').map( ( p, q ) => {
      const $cell = $(q);
      if ($cell.is('td')) {
        $cell.prepend('<div class="responsive-label">' + headers[p] + '</div>');
      }
    });
  });
};