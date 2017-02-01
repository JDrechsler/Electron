console.log('in renderer');
const toastr = require('toastr');
if (typeof jQuery == "undefined") {
    alert("jQuery is not installed");
}
else {
    console.log('jQuery is installed');
}
var appVars = {
    status: "inaktiv"
};
var appMethods = {};
var appComputedProperties = {};
document.addEventListener("DOMContentLoaded", () => {
    console.log("ready");
    new Vue({
        el: "#app",
        data: appVars,
        methods: appMethods,
        computed: appComputedProperties
    });
});
function PresentErrorNicely(err) {
    toastr.options = {
        "newestOnTop": false,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "999999",
        "hideDuration": "999999",
        "timeOut": "0",
        "extendedTimeOut": "0",
        "closeButton": true,
        "tapToDismiss": false,
        "progressBar": false
    };
    toastr["error"](err.message, `An error has occured.`);
}
process.on('uncaughtException', function (err) {
    PresentErrorNicely(err);
    console.log(err);
});