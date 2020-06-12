# run from top level folder .\scripts\icon-list.ps1

ls icons `
    | select Name `
    | %{ echo "$($_.Name)" >> icon-list.txt }

ls icons `
    | select Name `
    | %{ echo "<img title='$($_.Name)' src='icons\$($_.Name)' height='50'/>" >> icon-list-readme.html }

    ls icons `
    | select Name `
    | %{ echo "<div style='width:50px;height:50px;float:left;'><img style='max-width:100%;max-height:100%' title='$($_.Name)' src='icons\$($_.Name)'/></div>" >> icon-list.html }