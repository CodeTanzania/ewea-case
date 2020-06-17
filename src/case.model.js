import {
  MODEL_NAME_CASE,
  COLLECTION_NAME_CASE,
  PREDEFINE_NAMESPACE_CASESTAGE,
  PREDEFINE_NAMESPACE_PARTYGENDER,
  PREDEFINE_NAMESPACE_PARTYOCCUPATION,
  PREDEFINE_NAMESPACE_PARTYNATIONALITY,
  PREDEFINE_NAMESPACE_ADMINISTRATIVEAREA,
  DEFAULT_SEEDS,
} from '@codetanzania/ewea-internals';
import { get, pick, set } from 'lodash';
import { mergeObjects, idOf } from '@lykmapipo/common';
import '@lykmapipo/mongoose-sequenceable';
import { copyInstance, createSchema, model } from '@lykmapipo/mongoose-common';
import actions from 'mongoose-rest-actions';
import exportable from '@lykmapipo/mongoose-exportable';
import { caseSeverityFor } from '@codetanzania/ewea-common';

import {
  CASE_SCHEMA_OPTIONS,
  CASE_OPTION_SELECT,
  CASE_OPTION_AUTOPOPULATE,
} from './internals';

import {
  number,
  stage,
  severity,
  description,
  remarks,
} from './schema/base.schema';
import { victim, followup } from './schema/common.schema';
import { reporter, resolver } from './schema/parties.schema';
import { reportedAt, resolvedAt } from './schema/dates.schema';

const SCHEMA = mergeObjects(
  { number }, // TODO: occured location
  { stage, severity },
  { victim },
  { description },
  { reportedAt, reporter },
  { resolvedAt, resolver },
  { followup },
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
  // ensure reported date
  this.reportedAt = this.reportedAt || this.createdAt || new Date();

  // ensure case stage
  if (!get(this, 'stage')) {
    const staje = DEFAULT_SEEDS[PREDEFINE_NAMESPACE_CASESTAGE];
    set(this, 'stage', staje);
  }

  // TODO: compute score
  // TODO: move score to case base schema
  // always: ensure case severity from followup score
  const score = get(this, 'followup.score');
  this.severity = caseSeverityFor({ score });

  // ensure victim gender
  if (!get(this, 'victim.gender')) {
    const gender = DEFAULT_SEEDS[PREDEFINE_NAMESPACE_PARTYGENDER];
    set(this, 'victim.gender', gender);
  }

  // ensure victim default occupation
  if (!get(this, 'victim.occupation')) {
    const occupation = DEFAULT_SEEDS[PREDEFINE_NAMESPACE_PARTYOCCUPATION];
    set(this, 'victim.occupation', occupation);
  }

  // ensure victim default nationality
  if (!get(this, 'victim.nationality')) {
    const nationality = DEFAULT_SEEDS[PREDEFINE_NAMESPACE_PARTYNATIONALITY];
    set(this, 'victim.nationality', nationality);
  }

  // ensure victim default area
  if (!get(this, 'victim.area')) {
    const area = DEFAULT_SEEDS[PREDEFINE_NAMESPACE_ADMINISTRATIVEAREA];
    set(this, 'victim.area', area);
  }

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
