require('should');
const app = require('./app');
const server = app.listen();
const request = require('supertest').agent(server);

let token, token2;
let cookie // , cookie2;

describe('csrf', function() {
  after(function() {
    server.close();
  });

  describe('GET /token', function() {
    it('should get token', function(done) {
      request
      .get('/token')
      .expect(200)
      .end(function(err, res) {
        token = res.text;
        token.should.be.String;
        cookie = res.headers['set-cookie'].join(';');
        console.log('cookie = ', cookie)
        done(err);
      });
    });
  });

  describe('POST /post', function() {
    it('should 403 without token', function(done) {
      request
      .post('/post')
      .send({foo: 'bar'})
      .expect(403, done);
    });

    it('should 403 with wrong token', function(done) {
      request
      .post('/post')
      .send({foo: 'bar'})
      .set('x-csrf-token', 'wrong token')
      .expect(403, done);
    });

    it('should 200 with token in head', function(done) {
      request
      .post('/post')
      .set('Cookie', cookie)
      .set('x-csrf-token', token)
      .send({foo: 'bar'})
      .expect(200, done);
    });

    it('should 200 with token in body', function(done) {
      request
      .post('/post')
      .set('Cookie', cookie)
      .send({_csrf: token})
      .expect(200, done);
    });

    it('should 200 with token in body', function(done) {
      request
      .post('/post')
      .set('Cookie', cookie)
      .send({_csrf: token})
      .expect(200, done);
    });
  });

  describe('GET /token', function() {
    it('should get token', function(done) {
      request
      .get('/token')
      .expect(200)
      .end(function(err, res) {
        token2 = res.text;
        token2.should.be.String;
        // cookie2 = res.headers['set-cookie'].join(';');
        done(err);
      });
    });
  });

  describe('POST /post', function() {
    it('should 403 without token', function(done) {
      request
      .post('/post')
      .send({foo: 'bar'})
      .expect(403, done);
    });

    it('should 403 with wrong token', function(done) {
      request
      .post('/post')
      .send({foo: 'bar'})
      .set('x-csrf-token', 'wrong token')
      .expect(403, done);
    });

    it('should 200 with token in head', function(done) {
      request
      .post('/post')
      .set('Cookie', cookie)
      .set('x-csrf-token', token)
      .send({foo: 'bar'})
      .expect(200, done);
    });

    it('should 200 with token in body', function(done) {
      request
      .post('/post')
      .set('Cookie', cookie)
      .send({_csrf: token})
      .expect(200, done);
    });

    it('should 200 with token in body', function(done) {
      request
      .post('/post')
      .set('Cookie', cookie)
      .send({_csrf: token})
      .expect(200, done);
    });

    it('token2:should 200 with token in body', function(done) {
      request
      .post('/post')
      .set('Cookie', cookie)
      .send({_csrf: token})
      .expect(200, done);
    });

    it('token2: should 200 with token in head', function(done) {
      request
      .post('/post')
      .set('Cookie', cookie)
      .set('x-csrf-token', token2)
      .send({foo: 'bar'})
      .expect(200, done);
    });
  });
});
