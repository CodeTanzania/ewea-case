import {
  MODEL_NAME_CASE,
  COLLECTION_NAME_CASE,
} from '@codetanzania/ewea-internals';
import { pick } from 'lodash';
import { mergeObjects, idOf } from '@lykmapipo/common';
import { copyInstance, createSchema, model } from '@lykmapipo/mongoose-common';
import '@lykmapipo/mongoose-sequenceable';
import actions from 'mongoose-rest-actions';
import exportable from '@lykmapipo/mongoose-exportable';

import {
  CASE_SCHEMA_OPTIONS,
  CASE_OPTION_SELECT,
  CASE_OPTION_AUTOPOPULATE,
} from './internals';

import { number, description, remarks } from './schema/base.schema';
import { victim } from './schema/common.schema';
import { reporter, resolver } from './schema/parties.schema';
import { reportedAt, resolvedAt } from './schema/dates.schema';

const SCHEMA = mergeObjects(
  { number },
  { victim },
  { description },
  { reportedAt, reporter },
  { resolvedAt, resolver },
  { remarks }
);

/**
 * @module Case
 * @namespace Case
 * @name Case
 * @description A representation of an entity which define and track cases
 * during an emergency event.
 *
 * @see {@link https://en.wikipedia.org/wiki/Emergency}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @public
 * @example
 * const { Case } = require('@codetanzania/ewea-case');
 * Case.create(case, (error, created) => { ... });
 */
const CaseSchema = createSchema(
  SCHEMA,
  CASE_SCHEMA_OPTIONS,
  actions,
  exportable
);

/*
 *------------------------------------------------------------------------------
 *  Hooks
 *------------------------------------------------------------------------------
 */

/**
 * @name validate
 * @function validate
 * @description Case schema pre validation hook
 * @param {Function} done callback to invoke on success or error
 * @returns {object|Error} valid instance or error
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @private
 */
CaseSchema.pre('validate', function onPreValidate(done) {
  return this.preValidate(done);
});

/*
 *------------------------------------------------------------------------------
 *  Instance
 *------------------------------------------------------------------------------
 */

/**
 * @name preValidate
 * @function preValidate
 * @description Case schema pre validation hook logic
 * @param {Function} done callback to invoke on success or error
 * @returns {object|Error} valid instance or error
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @instance
 */
CaseSchema.methods.preValidate = function preValidate(done) {
  // ensure started(or reported) date
  // TODO: drop reported date & use createdAt
  this.reportedAt = this.reportedAt || this.createdAt || new Date();

  // TODO: ensure victim default gender
  // TODO: ensure victim default occupation

  // TODO: ensure event group and type

  // TODO: ensure default values

  // TODO: ensure case status

  // return
  return done(null, this);
};

/*
 *------------------------------------------------------------------------------
 * Statics
 *------------------------------------------------------------------------------
 */

/* static constants */
CaseSchema.statics.MODEL_NAME = MODEL_NAME_CASE;
CaseSchema.statics.COLLECTION_NAME = COLLECTION_NAME_CASE;
CaseSchema.statics.OPTION_SELECT = CASE_OPTION_SELECT;
CaseSchema.statics.OPTION_AUTOPOPULATE = CASE_OPTION_AUTOPOPULATE;

/**
 * @name prepareSeedCriteria
 * @function prepareSeedCriteria
 * @description Define seed data criteria
 * @param {object} seed event to be seeded
 * @returns {object} packed criteria for seeding
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @static
 */
CaseSchema.statics.prepareSeedCriteria = (seed) => {
  const copyOfSeed = copyInstance(seed);

  const criteria = idOf(copyOfSeed)
    ? pick(copyOfSeed, '_id')
    : pick(copyOfSeed, 'number');

  return criteria;
};

/* export case model */
export default model(MODEL_NAME_CASE, CaseSchema);
