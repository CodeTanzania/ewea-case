/**
 * @name ensureReporter
 * @description Set reporter on request body
 * @author lally elias <lallyelias87@gmail.com>
 *
 * @param {object} request valid http request
 * @param {object} response valid http response
 * @param {Function} next next middlware to invoke
 * @returns {Function} next middlware to invoke
 *
 * @license MIT
 * @since 0.1.0
 * @version 1.0.0
 * @public
 */
export const ensureReporter = (request, response, next) => {
  if (request.body && request.party) {
    request.body.reporter = request.body.reporter || request.party;
  }
  return next();
};

/**
 * @name ensureResolver
 * @description Set resolver on request body
 * @author lally elias <lallyelias87@gmail.com>
 *
 * @param {object} request valid http request
 * @param {object} response valid http response
 * @param {Function} next next middlware to invoke
 * @returns {Function} next middlware to invoke
 *
 * @license MIT
 * @since 0.1.0
 * @version 1.0.0
 * @public
 */
export const ensureResolver = (request, response, next) => {
  if (request.body && request.party) {
    const isResolved =
      request.body.resolvedAt ||
      request.body.completedAt ||
      request.body.resolver;
    if (isResolved) {
      request.body.resolvedAt = new Date();
      request.body.resolver = request.body.resolver || request.party;
    }
  }
  return next();
};
