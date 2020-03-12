ls icons `
    | select Name `
    | %{ echo "$($_.Name)" >> icon-list.txt }

ls icons `
    | select Name `
    | %{ echo "<img title='$($_.Name)' src='icons\$($_.Name)' style='width:50px;height:50px;'/>" >> icon-list.html }