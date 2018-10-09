// const kdd = require('kdd')
const ok = require('assert').ok
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
        ok(res.text.indexOf('<title>Posts</title>') >= 0)
        done();
      });
    });
    it('should see 0 post', function(done) {
      request
      .get('/')
      .expect(200, function(err, res) {
        if (err) return done(err);

        // res.should.be.html;
        ok(res.text.indexOf('<p>You have <strong>0</strong> posts!</p>') >= 0)
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
        ok(res.headers.location == '/')
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
        ok(res.header['content-type'].indexOf('html') >= 0)
        ok(res.text.indexOf('<h1>Title</h1>') >= 0)
        // res.text.should.include('<h1>Title</h1>');
        ok(res.text.indexOf('<p>Contents</p>') >= 0)
        // res.text.should.include('<p>Contents</p>');
        done();
      });
    });
  });
});
