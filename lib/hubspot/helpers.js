/**
 * Recursively encode an object as application/x-www-form-urlencoded.
 *
 * @param value Value to encode
 * @param key Key to encode (not required for top-level objects)
 * @return Encoded object
 */
var serialize = module.exports.serialize = function (value, key) {

  var output;

  if (!key && key !== 0)
    key = '';

  if (Array.isArray(value)) {
    output = [];
    value.forEach(function (val, index) {
      if (key !== '') index = key + '[' + index + ']';
      output.push(serialize(val, index));
    }, this);
    return output.join('&');
  } else if (typeof(value) == 'object') {
    output = [];
    for (var name in value) {
      if (value[name] && value.hasOwnProperty(name)) {
        output.push(serialize(value[name], key !== '' ? key + '[' + name + ']' : name));
      }
    }
    return output.join('&');
  } else {
    return key + '=' + encodeURIComponent(value);
  }

};

/**
 * Creates an Error with information received from hubspot. In addition to an
 * error message it also includes an error code.
 *
 *
 * @param message The error message
 * @param code The error code
 * @return Instance of {@link Error}
 */
var createhubspotError = module.exports.createhubspotError = function (errorResponse) {
  var code = errorResponse.status_code
  type = errorResponse.error;

  var error = new Error(error.description || '');

  if (code) {
    error.code = code;
    error.status_code = code;
  }

  if (type) {
    error.type = type;
    error.error = type;
  }
  return error;
};