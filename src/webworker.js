const worker = new Worker(new URL('./worker.js', import.meta.url));
worker.onmessage = function (event) {
    console.log('message received from sub thread',event['data'])
}
worker.onerror = function (error) {
    console.log('error caused by', error);
}
export default worker;