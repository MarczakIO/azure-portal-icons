ls icons `
    | select Name `
    | %{ echo "$($_.Name)" >> icon-list.txt }

ls icons `
    | select Name `
    | %{ echo "<img title='$($_.Name)' src='icons\$($_.Name)' height='50'/>" >> icon-list.html }