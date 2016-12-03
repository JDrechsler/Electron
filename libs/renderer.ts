console.log('in renderer')

const toastr = require('toastr')

import fs = require('fs')
import * as fsa from 'async-file';

if (typeof jQuery == "undefined") {
	alert("jQuery is not installed")
}else{
	console.log('jQuery is installed')
}

$( document ).ready( () => {
	console.log("ready!")
	
	document.ondragover = document.ondrop = (ev) => {
		ev.preventDefault()
	}
	
	document.body.ondrop = (ev) => {
		ReadFileOffsetFromDrop(ev)
	}

	$('#reloadButton').on('click', () => {
		PopulateContentFromFile($('#infoFilePath').text())
	})
});

function ReadFileOffsetFromDrop(ev:DragEvent){
	toastr.clear()
	var file:File = ev.dataTransfer.files[0]

	$('#infoFileName').text(file.name)
	$('#infoFilePath').text(file.path)
	$('#infoFileLength').text(file.size)

	PopulateContentFromFile(file.path)
}

function PopulateContentFromFile(filePath:string){
	
	var bytesFrom:string = $('#bytesFrom').val()
	var bytesTil:string = $('#bytesTil').val()
	var regOnlyNumbers:RegExp = /^[0-9]+$/g;

	if (!!bytesFrom.match(regOnlyNumbers) == false) { //Wenn Input nicht nur Zahlen ist...
		alert(`Bitte nur Zahlen für die Byteanzahl "von" verwenden. ${bytesFrom} ist nicht gültig. Danke.`)
		return
	}

	if (!!bytesTil.match(regOnlyNumbers) == false) { //Wenn Input nicht nur Zahlen ist...
		alert(`Bitte nur Zahlen für die Byteanzahl "bis" verwenden. ${bytesTil} ist nicht gültig. Danke.`)
		return
	}

	var start = parseInt(bytesFrom)
	var end = parseInt(bytesTil)

	console.log(`${start} - ${end}`)

	//Test if range is too high and if it even makes sense to read content

	if (end - start > 100000) {
		alert('Die Range ist zu groß und würde zu lange dauern.')
		return
	}

	var filePartOfContent:fs.ReadStream = fs.createReadStream(filePath, {start: start, end: end})
	var data:string = ''

	filePartOfContent.on('data', (chunk) => {
		data += chunk
	})
	
	filePartOfContent.on('end', () => {
		$('#droppedContent').text(data)
		$("#reloadButton").notify('Done', {
			elementPosition:"right",
			className:"success",
			autoHideDelay: 1000,
			hideDuration:0,
			showDuration:0
		})
	})

	filePartOfContent.on('error', (err: NodeJS.ErrnoException) => {
		if (err.code == 'EISDIR') {
			alert('Drag and Drop wird für Ordner nicht unterstützt.')
			return
		}
		PresentErrorNicely(err)
	})
}

function PresentErrorNicely(err:NodeJS.ErrnoException){
	
	toastr.options = {
		"newestOnTop": false,
		"positionClass": "toast-top-right",
		"preventDuplicates": false,
		"onclick": null, 
		"showDuration": "999999",
		"hideDuration": "999999",
		"timeOut":"0",
		"extendedTimeOut":"0",
		"closeButton":true,
		"tapToDismiss": false,
		"progressBar":false
	}

	toastr["error"](err.message, 'An error has ocured')
}

process.on('uncaughtException', function (err:NodeJS.ErrnoException) { 
    PresentErrorNicely(err)
	console.log(err)
})