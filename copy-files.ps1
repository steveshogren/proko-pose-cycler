cd D:\Art\Masters\test
Get-ChildItem "D:\Art\Masters\Artists"  -Recurse -File | 
Foreach-Object {
        $dirname = $_.Directory.Name
	$dest = "D:\Art\Masters\test\"
        Copy-Item -Path $_.FullName -Destination $dest
	& convert $_.Name -pointsize 18 -fill gray  -undercolor '#00000080' -gravity southeast  -annotate 0 $dirname  -background Black -fill Black -pointsize 64 label:'TEST' -gravity Center -append ($_.Name + "new" + $_.Extension)
	Remove-Item $_.Name
}
cd C:\programming
