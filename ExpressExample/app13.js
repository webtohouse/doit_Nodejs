// // 파일 업로드 기능 만들기
//
// var express = require('express');
// var http = require('http');
// var path = require('path');
// var bodyParser = require('body-parser');
// var cookieParser = require('cookie-parser');
// var expressSession = require('express-session');
//
// // 파일 업로드용 미들웨어 불러들이기
// var multer = require('multer');
// var fs = require('fs');
//
// // express 서버 객체
// var app = express();
//
// // 속성설정
// app.set('port', process.env.PORT || 3000);
//
// var server = http.createServer(app).listen(app.get('port'), function() {
//     console.log('익스프레스로 웹서버 실행함 : ' + app.get('port'));
// });
//
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(cookieParser());
// app.use(expressSession({
//     secret:'my key',
//     resave: true,
//     saveUninitialized: true
// }));
//
// // multer 미들웨어 사용하기
// app.use(multer({
//     dest: 'uploads',
//     putSingleFilesInArray: true,
//     limits: {
//         files: 10,
//         fileSize: 1024 * 1024
//     },
//     rename: function(fieldname, filename) {
//         return filename+Date.now();
//     },
//     onFileUploadStart: function (file) {
//         console.log('파일 업로드 시작 :' + file.originalname);
//     },
//     onFileUploadComplete: function( file, req, res) {
//         console.log('파일 업로드 완료 :' + file.fieldname + ' -> ' + file.path);
//     },
//     onFileSizeLimit: function(file) {
//         console.log('파일 크기 제한 초과 :' + file.originalname);
//     }
// }));
//
// app.post('/process/photo', function(req, res) {
//     var requestPath = req.path;
//     console.log(requestPath + '호출됨.');
//
//     var files = req.files.photo;
//
//     // 현재의 파일 정보를 저장할 변수 선언
//     var originalname = '',
//         name = '',
//         mimetype = '',
//         size = 0
//
//     if (Array.isArray(files)) { // 베열에 들어 있는 경우
//         console.log('배열에 들어있는 파일 개수 :' + files.length);
//
//         for (var index = 0; index < files.length; index++) {
//             originalname = files[index].originalname;
//             name = files[index].name;
//             mimetype = files[index].mimetype;
//             size = files[index].size;
//         }
//     } else { // 배열에 들어가 있지 않은 경우
//         console.log('파일개수 : 1');
//         originalname = files[index].originalname;
//         name = files[index].name;
//         mimetype = files[index].mimetype;
//         size = files[index].size;
//     }
//
//     console.log('현재 파일정보 :' + originalname + ',' + name + ',' + mimetype + ',' + size);
//
//     // 클라이언트에 응답 전송
//     res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
//     res.write('<h3>파일 업로드 성공</h3>');
//     res.write('</hr>');
//     res.write('<p>원본 파일 이름 : ' + originalname + '</p>');
//     res.write('<p>저장 파일 이름 : ' + name + '</p>');
//     res.write('<p>MimeType : ' + mimetype + '</p>');
//     res.write('<p>File Size : ' + size + '</p>');
//     res.end();
// });




/**
 * 파일 업로드
 *
 * 클라이언트에서 업로드 시 지정한 파일의 이름 : photo
 */

var express = require('express');
var http = require('http');
var static = require('serve-static');
var path = require('path');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

// 파일 업로드용 미들웨어
var multer = require('multer');
var fs = require('fs');


//클라이언트에서 ajax로 요청 시 CORS(다중 서버 접속) 지원
var cors = require('cors');


// 에러 핸들러 모듈 사용
var expressErrorHandler = require('express-error-handler');

var app = express();
var router = express.Router();

app.set('port', process.env.PORT || 3000);

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use(cookieParser());
app.use(expressSession({
	secret:'my key',
	resave:true,
	saveUninitialized:true
}));

//클라이언트에서 ajax로 요청 시 CORS(다중 서버 접속) 지원
app.use(cors());


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


//multer 미들웨어를 사용 : 미들웨어 사용 순서 중요  body-parser -> multer -> router
// 파일 제한 : 10개, 1G
// app.use(multer({
// 	dest: 'uploads',
// 	putSingleFilesInArray: true,
// 	limits: {
// 		files: 10,
// 		fileSize: 1024 * 1024 * 1024
// 	},
// 	rename: function (fieldname, filename) {
// 	    return filename+Date.now();
// 	},
// 	onFileUploadStart: function (file, req, res) {
// 	  file.uploadData = 0;
// 	  console.log('파일 업로드 시작 : '+ file.originalname);
//
// 	  var totalSize = req.param("totalSize");
// 	  console.log('totalSize : %s', totalSize);
//
// 	  if (totalSize) {
// 		  file.totalSize = parseFloat(totalSize);
// 	  }
// 	},
// 	onFileUploadComplete: function (file, req, res) {
// 	  console.log('파일 업로드 완료 : ' + file.fieldname + ' ->  ' + file.path);
// 	}
// }));



// 파일 업로드 패스에 대한 라우팅
router.route('/process/photo').post(upload.array('photo', 1), function(req, res) {
    console.log('/process/photo 호출됨.');
    var files = req.files;
    console.log('업로드된 파일');

    if(files.length > 0) {
        console.dir(files[0]);
    } else {
        console.log('파일이 없습니다.');
    }

    var originalname;
    var filename;
    var mimetype;
    var filesize;
    var filepath;

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

    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
    res.write('<h1>파일 업로드 성공!!!</h1>');
    res.write('<p>원본파일 : ' + originalname + '</p>');
    res.write('<p>저장파일 : ' + filename + '</p>');
    res.write('<p>파일타입 : ' + mimetype + '</p>');
    res.write('<p>저장경로 : ' + filepath + '</p>');
    res.write('<p>파일크기 : ' + filesize + '</p>');
    res.end();
});
app.use('/', router);
// app.post('/process/photo', function(req, res) {
// 	console.log('/process/photo 호출됨.');
//
// 	try {
// 		var files = req.files.photo;
//
// 		// 현재의 파일 정보를 저장할 변수 선언
// 		var originalname = '',
// 			name = '',
// 			mimetype = '',
// 			size = 0;
//
// 		if (Array.isArray(files)) {   // 배열에 들어가 있는 경우 (설정에서 1개의 파일도 배열에 넣게 했음)
// 	        console.log("배열에 들어있는 파일 갯수 : %d", files.length);
//
// 	        for (var index = 0; index < files.length; index++) {
// 	        	originalname = files[index].originalname;
// 	        	name = files[index].name;
// 	        	mimetype = files[index].mimetype;
// 	        	size = files[index].size;
// 	        }
//
// 	    } else {   // 배열에 들어가 있지 않은 경우 (현재 설정에서는 해당 없음)
// 	        console.log("파일 갯수 : 1 ");
//
// 	    	originalname = files[index].originalname;
// 	    	name = files[index].name;
// 	    	mimetype = files[index].mimetype;
// 	    	size = files[index].size;
// 	    }
//
// 		console.log('현재 파일 정보 : ' + originalname + ', ' + name + ', '
// 				+ mimetype + ', ' + size);
//
// 		// 클라이언트에 응답 전송
// 		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
// 		res.write('<h3>파일 업로드 성공</h3>');
// 		res.write('<hr/>');
// 		res.write('<p>원본 파일명 : ' + originalname + ' -> 저장 파일명 : ' + name + '</p>');
// 		res.write('<p>MIME TYPE : ' + mimetype + '</p>');
// 		res.write('<p>파일 크기 : ' + size + '</p>');
// 		res.end();
//
// 	} catch(err) {
// 		console.dir(err.stack);
// 	}
//
// });


app.get('/process/product', function(req, res) {
	console.log('/process/product 호출됨.');

	if (req.session.user) {
		res.redirect('/public/product.html');
	} else {
		res.redirect('/public/login2.html');
	}
});

app.post('/process/login', function(req, res) {
	console.log('/process/login 호출됨.');

	var paramId = req.param('id');
	var paramPassword = req.param('password');

	if (req.session.user) {
		// 이미 로그인된 상태
		console.log('이미 로그인되어 상품 페이지로 이동합니다.');

		res.redirect('/public/product.html');
	} else {
		// 세션 저장
		req.session.user = {
			id: paramId,
			name: '소녀시대',
			authorized: true
		};

		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h1>로그인 성공</h1>');
		res.write('<div><p>Param id : ' + paramId + '</p></div>');
		res.write('<div><p>Param password : ' + paramPassword + '</p></div>');
		res.write("<br><br><a href='/process/product'>상품 페이지로 이동하기</a>");
		res.end();
	}
});

app.get('/process/logout', function(req, res) {
	console.log('/process/login 호출됨.');

	if (req.session.user) {
		// 로그인된 상태
		console.log('로그아웃합니다.');

		req.session.destroy(function(err) {
			if (err) {throw err;}

			console.log('세션을 삭제하고 로그아웃되었습니다.');
			res.redirect('/public/login2.html');
		});
	} else {
		// 로그인 안된 상태
		console.log('아직 로그인되어있지 않습니다.');

		res.redirect('/public/login2.html');
	}
});

// 404 에러 페이지 처리
var errorHandler = expressErrorHandler({
    static: {
      '404': './public/404.html'
    }
});

app.use( expressErrorHandler.httpError(404) );
app.use( errorHandler );

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
