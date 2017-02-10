require("electron-connect").client.create()

console.log('in renderer')

var toastr:Toastr = require('toastr')

if (typeof jQuery == "undefined") {
	alert("jQuery is not installed")
}else{
	console.log('jQuery is installed')
}

var appVars = {
    
}

var appMethods = {
    testButtonClass: () => {
        appVars.hacks.unlimitedRes = !appVars.hacks.unlimitedRes
    },
    showError: () => {
        throw DOMException
    },
    tryMemoryJS: () => {
        var memscan = require("memscan");

        var pid = memscan.findProcess("notepad.exe");
        if (pid < 1) {
            console.error("Process not found");
            return;
        }
        console.log("Found process: " + pid);
        
    }
}

var appComputedProperties = {

}

document.addEventListener("DOMContentLoaded", () => {

    console.log("ready")

    new Vue({
        el: "#app",
        data: appVars,
        methods: appMethods,
        computed: appComputedProperties
    })
})

function PresentErrorNicely(err:NodeJS.ErrnoException){
    
    toastr.options = {
        "newestOnTop": false,
		"positionClass": "toast-top-right",
		"preventDuplicates": false,
		"closeButton":true,
		"tapToDismiss": false,
		"progressBar":false
	}

	toastr["error"](err.message, `An error has occured. Check console for more info.`)
}

process.on('uncaughtException', function (err: NodeJS.ErrnoException) {
    PresentErrorNicely(err)
	console.log(`Uncaught exception:`)
    console.log(err)
})