const express = require('express'); 
const app = express(); 
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const Item = require('./models/item');
const Fuse = require('fuse.js');

mongoose.connect('mongodb+srv://thelastenvoy:envoy29@cluster1.ixeez.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(res => {
    console.log('connected to db !');
}, (e) => {
    console.log(e);
});

mongoose.Promise = global.Promise;


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    
    /* here adding all these headers to avoid the cors error .  */
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With,Content-Type, Accept, Authorization");
    
    /*
     usually the browser first sends an options request to find out the type of
       request it can send , therefore , it will get its response here.
    */
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next(); 
});


app.get('/search', function (req, res, next) {
    const {
        querystring
    } = req.query;
    console.log(querystring);
    Item.find()
        .then((response) => {
            console.log(response);
            const fuse = new Fuse(response, {
                keys: ['name']
            });

            const result = fuse.search(querystring);
            var a = [];
            for (var i = 0; i < result.length; i++){
                a.push({
                    _id: result[i].item._id,
                    name: result[i].item.name
                });
            }
            console.log(a);
            res.status(200).json({ data: a });

        }, (e) => {
            console.log(e);
            res.status(400).json({ error: e });
        });
});


app.listen(port, (() => {
    console.log('Server listening on port 5000 hehehe');
}));


/* Trading_View_Stock_Name: new RegExp(querystring,'i') */