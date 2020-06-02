import { get } from 'lodash';
import { ObjectId } from '@lykmapipo/mongoose-common';
import { Party } from '@codetanzania/emis-stakeholder';

import { AUTOPOPULATE_OPTION_PARTY } from '../internals';

/**
 * @name reporter
 * @description A party(i.e call center or EOC operator) who
 * recorded a case.
 *
 * @memberof Case
 *
 * @type {object}
 * @property {object} type - schema(data) type
 * @property {boolean} required - mark required
 * @property {boolean} index - ensure database index
 * @property {boolean} exists - ensure ref exists before save
 * @property {object} autopopulate - auto populate(eager loading) options
 * @property {boolean} taggable - allow field use for tagging
 * @property {boolean} exportable - allow field use for exporting
 * @property {boolean} aggregatable - allow field use for aggregation
 * @property {boolean} default - default value set when none provided
 * @property {object} fake - fake data generator options
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @instance
 * @example
 * {
 *   _id: "5bcda2c073dd0700048fb846",
 *   name: "Jane Doe",
 *   mobile: "+255715463739",
 *   email: "jane.doe@example.com",
 * }
 */
export const reporter = {
  type: ObjectId,
  ref: Party.MODEL_NAME,
  // required: true,
  index: true,
  exists: true,
  autopopulate: AUTOPOPULATE_OPTION_PARTY,
  taggable: true,
  exportable: {
    format: (v) => get(v, 'name'),
    default: 'NA',
  },
  aggregatable: { unwind: true },
  default: undefined,
};

/**
 * @name resolver
 * @description A party(i.e call center or EOC operator) who
 * resolve(i.e discharge) a case.
 *
 * @memberof Case
 *
 * @type {object}
 * @property {object} type - schema(data) type
 * @property {boolean} required - mark required
 * @property {boolean} index - ensure database index
 * @property {boolean} exists - ensure ref exists before save
 * @property {object} autopopulate - auto populate(eager loading) options
 * @property {boolean} taggable - allow field use for tagging
 * @property {boolean} exportable - allow field use for exporting
 * @property {boolean} aggregatable - allow field use for aggregation
 * @property {boolean} default - default value set when none provided
 * @property {object} fake - fake data generator options
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @instance
 * @example
 * {
 *   _id: "5bcda2c073dd0700048fb846",
 *   name: "Jane Doe",
 *   mobile: "+255715463739",
 *   email: "jane.doe@example.com",
 * }
 */
export const resolver = {
  type: ObjectId,
  ref: Party.MODEL_NAME,
  // required: true,
  index: true,
  exists: true,
  autopopulate: AUTOPOPULATE_OPTION_PARTY,
  taggable: true,
  exportable: {
    format: (v) => get(v, 'name'),
    default: 'NA',
  },
  aggregatable: { unwind: true },
  default: undefined,
};
