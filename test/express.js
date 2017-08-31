const express = require('express');
const app = express();
const Loader = new  require('./hotload');


let loader=new Loader();

app.use((req, res, next) => {
   
    res.json(loader.load('../test/a'));
    // console.log();
    next();
});

setInterval(()=>{
    console.log(loader.load('../test/a'));
},5000)
// try{

// console.log(require.resolve('./test/'));
// console.log(require('./test/a'));
// }catch(e){
//     if (e.code==='MODULE_NOT_FOUND'){

//     }
// console.log(e.constructor);
// }


// console.log(require('./mock'));

// app.listen(8000, function () {
//     // console.log(`8000`);
// });

