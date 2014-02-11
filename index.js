/**
 * Module dependencies
 */
var request = require('request')

/**
 * Fetches a list of packages from an npm registry
 *
 * Opts can contain the following keys:
 *
 *  - registry {String} required
 *  - fullUrl  {Boolean} don't modify the registry url
 *  - filter   {Function} filters the results (should return true/false)
 *
 * **Note:** If `fullUrl` is true, the url should point to /<db>/_all_docs
 *
 * @param {Object} opts
 * @param {Function} cb function(err, pkgs)
 * @api public
 */
exports.getPkgs = function(opts, cb) {
  if ('object' !== typeof opts || !opts)
    return cb && cb(new Error('opts is required'))
  var registry = opts.registry || null
  if (!registry) return cb && cb(new Error('registry is required'))
  if (!opts.fullUrl) {
    registry += '/registry/_all_docs'
  }

  request(registry, {json:true}, function(err, res, body) {
    if (err) return cb && cb(err)
    if (res.statusCode !== 200) {
      var e = new Error('received non-200 status code')
      e.body = body
      return cb && cb(e)
    }
    var rows = body.rows.map(function(f) {
      return f.id
    })

    if ('function' === typeof opts.filter) {
      rows = rows.filter(opts.filter)
    }
    return cb && cb(null, rows)
  })
}
