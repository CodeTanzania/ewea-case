import { getString } from '@lykmapipo/env';
import {
  getFor,
  schemaFor,
  downloadFor,
  getByIdFor,
  postFor,
  patchFor,
  putFor,
  deleteFor,
  Router,
} from '@lykmapipo/express-rest-actions';

import Case from './case.model';

import { ensureReporter } from './http.middlewares';

/* constants */
const API_VERSION = getString('API_VERSION', '1.0.0');
const PATH_SINGLE = '/cases/:id';
const PATH_LIST = '/cases';
const PATH_EXPORT = '/cases/export';
const PATH_SCHEMA = '/cases/schema/';

/**
 * @name CaseHttpRouter
 * @namespace CaseHttpRouter
 *
 * @description A representation of an entity which define and track cases
 * during an emergency event.
 *
 * @see {@link https://en.wikipedia.org/wiki/Emergency}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 1.0.0
 * @public
 */
const router = new Router({
  version: API_VERSION,
});

/**
 * @name GetCasees
 * @memberof CaseHttpRouter
 * @description Returns a list of cases
 */
router.get(
  PATH_LIST,
  getFor({
    get: (options, done) => Case.get(options, done),
  })
);

/**
 * @name GetCaseSchema
 * @memberof CaseHttpRouter
 * @description Returns case json schema definition
 */
router.get(
  PATH_SCHEMA,
  schemaFor({
    getSchema: (query, done) => {
      const jsonSchema = Case.jsonSchema();
      return done(null, jsonSchema);
    },
  })
);

/**
 * @name ExportCasees
 * @memberof CaseHttpRouter
 * @description Export cases as csv
 */
router.get(
  PATH_EXPORT,
  downloadFor({
    download: (options, done) => {
      const fileName = `cases_exports_${Date.now()}.csv`;
      const readStream = Case.exportCsv(options);
      return done(null, { fileName, readStream });
    },
  })
);

/**
 * @name PostCase
 * @memberof CaseHttpRouter
 * @description Create new case
 */
router.post(
  PATH_LIST,
  ensureReporter,
  postFor({
    post: (body, done) => Case.post(body, done),
  })
);

/**
 * @name GetCase
 * @memberof CaseHttpRouter
 * @description Get existing case
 */
router.get(
  PATH_SINGLE,
  getByIdFor({
    getById: (options, done) => Case.getById(options, done),
  })
);

/**
 * @name PatchCase
 * @memberof CaseHttpRouter
 * @description Patch existing case
 */
router.patch(
  PATH_SINGLE,
  patchFor({
    patch: (options, done) => Case.patch(options, done),
  })
);

/**
 * @name PutCase
 * @memberof CaseHttpRouter
 * @description Put existing case
 */
router.put(
  PATH_SINGLE,
  putFor({
    put: (options, done) => Case.put(options, done),
  })
);

/**
 * @name DeleteCase
 * @memberof CaseHttpRouter
 * @description Delete existing case
 */
router.delete(
  PATH_SINGLE,
  deleteFor({
    del: (options, done) => Case.del(options, done),
    soft: true,
  })
);

/* expose router */
export default router;
