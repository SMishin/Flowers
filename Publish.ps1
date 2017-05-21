param(
  [string]$version = '1.0.0'
)

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
	cd .\Flowers.Core-Web
	
	If ((Test-Path .\obj) -eq "True") {
		Remove-Item .\obj -Force -Recurse
	}
	
	msbuild "$projectName.Core-Web.csproj" /t:restore #restore packages
	msbuild "$projectName.Core-Web.csproj" /p:DeployOnBuild=true /p:Configuration=Release /p:AutoParameterizationWebConfigConnectionStrings=false /p:AssemblyVersion=$version /p:FileVersion=$version /p:Version=$version
	
	Push-Location	
		cd .\bin\Release\net462\win7-x86
		Write '------Copying Package ---- ' 
		Copy-Item .\Publish $distPath -Recurse
			Write '------Rename Package ---- ' 
		Rename-Item -Path $distPath\Publish -NewName $projectName
	Pop-Location
Pop-Location

Push-Location
	cd .\Flowers.Core-Web\wwwroot
	
	If ((Test-Path .\dist) -eq "True") {
		Remove-Item .\dist -Force -Recurse
	}
	
	npm i
	npm run build
	Copy-Item .\dist $distPath\$projectName\wwwroot -Recurse
Pop-Location
