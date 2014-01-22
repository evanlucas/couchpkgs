var couch = require('./index')
  , should = require('should')

describe('getPkgs()', function() {
  describe('omit opts', function() {
    it('should return an error', function(done) {
      couch.getPkgs(null, function(err) {
        should.exist(err)
        err.should.be.instanceOf(Error)
        err.should.have.property('message')
          . eql('opts is required')
        done()
      })
    })
  })

  describe('omit opts.registry', function() {
    it('should return an error', function(done) {
      couch.getPkgs({}, function(err) {
        should.exist(err)
        err.should.be.instanceOf(Error)
        err.should.have.property('message')
          . eql('registry is required')
        done()
      })
    })
  })

  describe('pass fullUrl', function() {
    it('should return null, array', function(done) {
      couch.getPkgs({
        registry: 'https://registry.npmjs.org/-/_view/allVersions?reduce=false&limit=20',
        fullUrl: true
      }, function(err, res) {
        should.ifError(err)
        res.should.be.instanceOf(Array)
        res.length.should.eql(20)
        done()
      })
    })
  })

  describe('should support filter', function() {
    it('should return null, array', function(done) {
      couch.getPkgs({
        registry: 'https://registry.npmjs.org/-/_view/allVersions?reduce=false&limit=20',
        fullUrl: true,
        filter: function(f) {
          return (f[0] === 'a')
        }
      }, function(err, res) {
        should.ifError(err)
        res.should.be.instanceOf(Array)
        res.length.should.eql(8)
        done()
      })
    })
  })
})
