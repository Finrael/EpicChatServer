This is a jwt strategy implementation, that can be used as a replacement to `passport.session()`.

## Usage

First import the strategy:

```
	passport.use(new JwtSession(<Insert secret here>));
```

The `options` field:
```
options = {
  secret: options.secret, //The decoding secret
  requestKey: options.requestKey || 'user',   //The key in the JWT that defines the user id
  requestArg: options.requestArg || 'accessToken' /* The parameter name on the HTTP request that refers to the JWT. The middleware will look for this property in the query string, request body, and headers. The header name will be derived from a camelBack representation of the property name. For example, if the requestArg is "accessToken" (the default) then this instance of the middlware will look for the header name "x-access-token" */
};
```
The `header` option looks for it in the `Authorization` request header, and query gets the token from the `token` query parameter.

You can also add a `expires` parameter in your jwt payload, which will deny authorization if the token is expired.

After `passport.initialize()`, place `app.use(passport.authenticate('jwt', options));`

It will call deserializeUser if a jwt token is present.
For everything to work properly you need to be sending a token that contains `user` in the payload, this is the user id we are deserializing.

For sample implementation code, check out [Nuke.js](https://github.com/FREEZX/nuke.js).