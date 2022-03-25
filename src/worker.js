self.onmessage = function (event) {
    console.log('Received message from main ' + event.data);
}
self.onerror = function (err) {
    console.log("err", err);
}