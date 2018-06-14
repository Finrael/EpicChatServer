'use strict';

/**
 * Module dependencies.
 */
var pause = require('pause'),
  util = require('util'),
  _ = require('lodash'),
  Strategy = require('passport-strategy'),
  jwt = require('jwt-simple');


/**
 * `JwtStrategy` constructor.
 *
 * @api public
 */
function JwtStrategy(options) {
  Strategy.call(this);
  this.name = 'jwt';
  options = options || {};

  this.options = {
    secret: options.secret,
    maxAge: options.maxAge || 86400,
    requestKey: options.requestKey || 'user',
    requestArg: options.requestArg || 'accessToken'
  };
}

/**
 * Inherit from `Strategy`.
 */
util.inherits(JwtStrategy, Strategy);

var headerName = function(requestArg){
  return _.reduce(requestArg.split(''), function(memo, ch){
    return memo + (ch.toUpperCase() === ch ? '-' + ch.toLowerCase() : ch);
  }, 'x' + (requestArg.charAt(0) === requestArg.charAt(0).toUpperCase() ? '' : '-'));
};

/**
 * Authenticate request based on the current session state.
 *
 * The session authentication strategy uses the session to restore any login
 * state across requests.  If a login session has been established, `req.user`
 * will be populated with the current user.
 *
 * This strategy is registered automatically by Passport.
 *
 * @param {Object} req
 * @param {Object} options
 * @api protected
 */
JwtStrategy.prototype.authenticate = function(req, options) {
  if (!req._passport) { return this.error(new Error('passport.initialize() middleware not in use')); }
  options = this.options || {};

  var requestHeader = headerName(options.requestArg);

  var payload = {};

  var token = req.query ? req.query[options.requestArg] : false;
  token = token || req.headers[requestHeader];
  token = token || (req.cookies ? req.cookies[requestHeader] : false);

  if(token){
    try {
      payload = jwt.decode(token, options.secret);
    } catch(e) {
      
    }
  }

  var self = this,
    su = payload.user;
  if ((su || su === 0) && (payload.expires > Date.now() || !payload.expires) ) {
    // NOTE: Stream pausing is desirable in the case where later middleware is
    //       listening for events emitted from request.  For discussion on the
    //       matter, refer to: https://github.com/jaredhanson/passport/pull/106


    var paused = options.pauseStream ? pause(req) : null;
    req._passport.instance.deserializeUser(su, req, function(err, user) {
      if (err) { return self.error(err); }
      if (!user) {
        if(req._passport && req._passport.session) {
          delete req._passport.session.user;
        }
        self.pass();
        if (paused) {
          paused.resume();
        }
        return;
      }
      var property = req._passport.instance._userProperty || 'user';
      req[property] = user;
      self.pass();
      if (paused) {
        paused.resume();
      }
    });
  } else {
    self.pass();
  }
};


/**
 * Expose `JwtStrategy`.
 */
module.exports = JwtStrategy;