const kdd = require('kdd')
const app = require('./app');
const server = app.listen();
const request = require('supertest').agent(server);

describe('Blog', function() {
  after(function() {
    server.close();
  });

  describe('GET /', function() {
    it('should see title "Posts"', function(done) {
      request
      .get('/')
      .expect(200, function(err, res) {
        if (err) return done(err);
        // res.should.be.html;
        // res.text.should.include('<title>Posts</title>');
        kdd.has(res.text, '<title>Posts</title>')
        done();
      });
    });
    it('should see 0 post', function(done) {
      request
      .get('/')
      .expect(200, function(err, res) {
        if (err) return done(err);

        // res.should.be.html;
        kdd.has(res.text, '<p>You have <strong>0</strong> posts!</p>')
        // res.text.should.include('<p>You have <strong>0</strong> posts!</p>');
        done();
      });
    });
  });

  describe('POST /post/new', function() {
    it('should create post and redirect to /', function(done) {
      request
      .post('/post')
      .send({title: 'Title', body: 'Contents'})
      .end(function(err, res) {
        if (err) return done(err);

        // res.header.location.should.be.equal('/');
        kdd.yes(res.headers.location == '/')
        done();
      });
    });
  });

  describe('GET /post/0', function() {
    it('should see post', function(done) {
      request
      .get('/post/0')
      .expect(200, function(err, res) {
        if (err) return done(err);

        // res.should.be.html;
        // console.log('headers=', res.header)
        kdd.has(res.header['content-type'], 'html')
        kdd.has(res.text, '<h1>Title</h1>')
        // res.text.should.include('<h1>Title</h1>');
        kdd.has(res.text, '<p>Contents</p>')
        // res.text.should.include('<p>Contents</p>');
        done();
      });
    });
  });
});
