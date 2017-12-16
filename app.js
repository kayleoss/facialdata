var express = require('express'),
    app = express(),
    multer = require('multer'),
    request = require('request'),
    FormData = require('form-data'),
    fs = require('fs'),
    atob = require('atob'),
    btoa = require('btoa'),
    FacePlusPlus = require('faceplusplus'),
    FileReader = require('filereader');
    bodyParser = require('body-parser');

var config = {
    api_key: 'lzw9nEShl_Xh9A0yjEkhwfn6ys9LKqQ2',
    api_secret: 'i8bWgqp3HyrlQqwZFeR2aLLNh0glFpmx',
    region: 'us'
}
var client = new FacePlusPlus(config);
var storage =   multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
    });
var upload = multer({ storage : storage}).single('userPhoto');

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', function(req, res){
    res.render('home');
});
app.get('/upload', function(req, res){
    res.render('upload');
});
app.post('/upload', upload, function(req, res){
    // let img_64 = '';
    // fs.readFile('./public/woman.png', 'base64', function(err, data){
    //     if(!err){
    //         img_64 = data;
    //     }else{
    //         res.send(err);
    //     }
    // });
    var url = 'https://api-us.faceplusplus.com/facepp/v3/detect';
    console.log(req.file.path);
    request.post({
        url: url,
        qs: {
            api_key: 'lzw9nEShl_Xh9A0yjEkhwfn6ys9LKqQ2',
            api_secret: 'i8bWgqp3HyrlQqwZFeR2aLLNh0glFpmx',
            image_url: 'http://localhost:7000/uploads/' + req.file.filename,        
            return_attributes: 'age,gender,emotion,ethnicity'
        }
    }, function(err, response, body){
        if(!err && response.statusCode == 200){
            res.send(body);
        }else{
            console.log(err);
            res.send(err + ' ' + JSON.stringify(response) + response.statusCode);
        }
    });
});


app.listen(process.env.PORT || 7000 , process.env.IP, function(){
    console.log('-------------facial analysis is running-------------');
})


//https://api-us.faceplusplus.com/facepp/v3/detect?api_key=lzw9nEShl_Xh9A0yjEkhwfn6ys9LKqQ2&api_secret=i8bWgqp3HyrlQqwZFeR2aLLNh0glFpmx




//https://api-us.faceplusplus.com/facepp/v3/detect?api_key=lzw9nEShl_Xh9A0yjEkhwfn6ys9LKqQ2&api_secret=i8bWgqp3HyrlQqwZFeR2aLLNh0glFpmx&
//return_attributes=gender,age,smiling,emotion,ethnicity,beauty