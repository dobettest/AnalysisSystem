(function (context, fn) {
    console.log("thisArg", context)
    return fn.bind(context);

})(this, function () {
    console.log("thisArg", this)
})