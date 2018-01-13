// 사용모듈
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var static = require('serve-static');
var path = require('path');

// 파일 업로드용 미들웨어
var multer = require('multer');
var fs = require('fs');

var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded( { extended: true}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 파일 업로드용
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    // cb(null, file.fieldname + '-' + Date.now());
    var extension = path.extname(file.originalname); // 확장자 분리하여 가져오기
    var basename = path.basename(file.originalname, extension); // 파일 이름 분리
    cb(null, basename + Date.now() + extension);
  }
});

var upload = multer({
    storage: storage,
    limits: {
        files: 10, // 업로드할 수 있는 최대 파일 수
        fileSize: 1024 * 1024 * 1024 // 업로드 할 수 있는 최대 파일 사이즈
    }
});

app.get('/', function(req, res) {
    var callpath = req.path;
    console.log(callpath + '요청함');
    res.redirect('/myMeomo1.html');
});

router.route('/mymemo/insert').post(upload.array('myphoto', 1), function(req, res) {
    // 요청 경로
    var callpath = req.path;

    // 작성자 정보
    var writer = req.body.writer;
    var writedate = req.body.writedate;
    var contents = req.body.contents;
    var files = req.files;
    console.log(callpath + '요청함');

    if(files.length> 0) {
        console.dir(files[0]);
    } else {
        console.log('파일이 없습니다.');
    }

    // 현재 이미지 파일 정보를 저장.
    var originalname = '',
    filename = '',
    filepath = '',
    mimetype = '',
    filesize = 0;

    if(Array.isArray(files)) {
        for(var i = 0; i < files.length; i++) {
            originalname = files[i].originalname;
            filename = files[i].filename;
            mimetype = files[i].mimetype;
            filesize = files[i].size;
            filepath = files[i].path;
        }
    }

    console.log('원본파일' + originalname);
    console.log('저장파일' + filename);
    console.log('파일타입' + mimetype);
    console.log('저장경로' + filepath);
    console.log('파일크기' + filesize);

    res.write('<h1>나의메모</h1>');
    res.write('<p>작성자 : ' + writer + '</p>');
    res.write('<p>작성일 : ' + writedate + '</p>');
    res.write('<p>내용 : ' + contents + '</p>');
    res.write('<p>저장파일 : ' + filename + '</p>');
    res.write('<p>이미지 : <img src="../'+filepath+'" width="100" alt="'+filename+'">이미지크기 : '+filesize+'KB</p>');
    res.write('<p>메모가 저장되었습니다.</p>');
    res.write('<hr>');
    res.write('<form action="/rewrite">');
    res.write('<input type="submit" value="다시작성">');
    res.write('</form>');
    res.end();


});

app.use('/', router);

app.get('/rewrite', function(req, res) {
    var callpath = req.path;
    console.log(callpath + '요청함');
    res.redirect('/myMeomo1.html');
});

app.set('port', process.env.PORT || 3000);
http.createServer(app).listen(app.get('port'), function() {
    console.log('서버실행' + app.get('port'));
});

app.all('*', function(req, res) {
    res.send(404, '<h1>ERROR - 페이지를 찾을 수 없습니다.</h1>');
});
