var fs = require('fs');
var url = require('url');
var path = require('path');
var PassThrough = require('stream').PassThrough;
var request = require('request');

const DOC = 'io.js.docset/Contents/Resources/Documents';
const LATO = 'fonts.googleapis.com/css?family=Lato:400,700,400italic';
const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.111 Safari/537.36';
const URL_REG = /(?:url\(([^\(\)]+)\))/g

var lato = fs.createWriteStream(path.join(__dirname, DOC, LATO));

var pass = new PassThrough;
var context = [];
pass.on('data', function (chunk) {
  context.push(chunk);
});
pass.on('end', function () {
  context = context.join('');
  var match;
  while ((match = URL_REG.exec(context))) {
    var o = url.parse(match[1]);
    var dir = o.hostname;
    console.log('downloading', match[1]);
    request.get({
      uri: match[1],
      headers: {
        referer: 'https://iojs.org/api/',
        'user-agent': USER_AGENT
      }
    })
      .pipe(fs.createWriteStream(path.join(__dirname, DOC, dir, o.pathname)));
  }
});

console.log('downloading', 'https://' + LATO);
request.get({
  uri: 'https://' + LATO,
  useQuerystring: true,
  headers: {
    referer: 'https://iojs.org/api/',
    'user-agent': USER_AGENT
  }
})
  .pipe(pass)
  .pipe(lato)
