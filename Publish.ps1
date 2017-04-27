$projectName = 'Flowers'
$distPath = '..\_dist';

If (-not(Test-Path $distPath ) -eq "True") {
	New-Item $distPath -Type directory
}

$distPath = Convert-Path(Resolve-Path -path $distPath)

If (-not(Test-Path $distPath) -eq "True") {
	New-Item -Type directory -Path $distPath
}


If ((Test-Path $distPath\$projectName) -eq "True") {
	Remove-Item -Path $distPath\$projectName -Recurse -Force
}

Push-Location	
	cd .\Flowers.Web
	
	If ((Test-Path .\obj) -eq "True") {
		Remove-Item .\obj -Force -Recurse
	}
	
	msbuild $projectName.Web.csproj /p:DeployOnBuild=true /p:Configuration=Release /p:AutoParameterizationWebConfigConnectionStrings=false
	
	Push-Location	
		cd .\obj\Release\Package
		Write '------Copying Package ---- ' 
		Copy-Item .\PackageTmp $distPath -Recurse
			Write '------Rename Package ---- ' 
		Rename-Item -Path $distPath\PackageTmp -NewName $projectName
	Pop-Location
Pop-Location

Push-Location
	cd .\Flowers.Web\static
	
	If ((Test-Path .\dist) -eq "True") {
		Remove-Item .\dist -Force -Recurse
	}
	
	npm i
	npm run build
	Copy-Item .\dist $distPath\$projectName\static -Recurse
Pop-Location
