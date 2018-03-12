'use strict';

var RB = require('./ResponseBuilder');

module.exports = RB.extend({

   init: function() {
      var now = new Date(),
          builtOn = [];

      this._super();
      this.allowCORS();
      this.supportJSONP('callback');
      this.cacheForMinutes(30);

      builtOn.push(process.env.AWS_REGION);
      builtOn.push(process.env.AWS_LAMBDA_FUNCTION_NAME);
      builtOn.push(process.env.AWS_LAMBDA_FUNCTION_VERSION);
      builtOn.push(process.env.CODE_VERSION);

      this.header('X-Built-On', builtOn.join(':'));
      this.header('X-Page-Built', now.toUTCString());
   },

   toResponse: function(req) {
      this.header('X-Elapsed-Millis', new Date().getTime() - req.started());
      this.header('X-RequestID', req.context('awsRequestId'));
      return this._super(req);
   },

});

module.exports.CONTENT_TYPE_JSON = RB.CONTENT_TYPE_JSON;
module.exports.CONTENT_TYPE_JSONP = RB.CONTENT_TYPE_JSONP;
module.exports.CONTENT_TYPE_RSS = RB.CONTENT_TYPE_RSS;
module.exports.CONTENT_TYPE_HTML = RB.CONTENT_TYPE_HTML;
