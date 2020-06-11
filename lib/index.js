'use strict';

const eweaInternals = require('@codetanzania/ewea-internals');
const common = require('@lykmapipo/common');
const env = require('@lykmapipo/env');
const mongooseCommon = require('@lykmapipo/mongoose-common');
const expressCommon = require('@lykmapipo/express-common');
const expressRestActions = require('@lykmapipo/express-rest-actions');
const file = require('@lykmapipo/file');
const lodash = require('lodash');
require('@lykmapipo/mongoose-sequenceable');
const actions = require('mongoose-rest-actions');
const exportable = require('@lykmapipo/mongoose-exportable');
const eweaCommon = require('@codetanzania/ewea-common');
const moment = require('moment');
const predefine = require('@lykmapipo/predefine');
const eweaEvent = require('@codetanzania/ewea-event');
require('mongoose-geojson-schemas');
const emisStakeholder = require('@codetanzania/emis-stakeholder');

// common constants
const DEFAULT_COUNTRY_CODE = env.getString('DEFAULT_COUNTRY_CODE', 'TZ');
const COUNTRY_CODE = env.getString('COUNTRY_CODE', DEFAULT_COUNTRY_CODE);

// case schema
const CASE_SCHEMA_OPTIONS = {
  collection: eweaInternals.COLLECTION_NAME_CASE,
};

// case options
const CASE_OPTION_SELECT = {
  number: 1,
};
const CASE_OPTION_AUTOPOPULATE = {
  select: CASE_OPTION_SELECT,
  maxDepth: eweaInternals.POPULATION_MAX_DEPTH,
};

// relation options

// TODO: refactor to ewea-internals
const AUTOPOPULATE_OPTION_PREDEFINE = {
  select: {
    'strings.name': 1,
    'strings.color': 1,
    'strings.code': 1,
  },
  maxDepth: eweaInternals.POPULATION_MAX_DEPTH,
};

// TODO: refactor to ewea-internals
const AUTOPOPULATE_OPTION_AREA = {
  select: {
    'strings.name': 1,
    'strings.color': 1,
    'strings.code': 1,
    'relations.level': 1,
  },
  maxDepth: 2,
};

// TODO: refactor to ewea-internals
const AUTOPOPULATE_OPTION_PARTY = {
  select: { name: 1, email: 1, mobile: 1, abbreviation: 1, role: 1 },
  maxDepth: 2,
};

/**
 * @name group
 * @description Event group underwhich a case belongs to.
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
 *   _id: '5dde6ca23631a92c2d616253',
 *   strings: { name: { en: 'Meteorological' }, code: 'MAT' },
 * }
 */
const group = {
  type: mongooseCommon.ObjectId,
  ref: predefine.Predefine.MODEL_NAME,
  // required: true,
  index: true,
  exists: true,
  aggregatable: { unwind: true },
  autopopulate: AUTOPOPULATE_OPTION_PREDEFINE,
  taggable: true,
  exportable: {
    format: (v) => lodash.get(v, 'strings.name.en'),
    default: 'NA',
  },
  default: undefined,
};

/**
 * @name type
 * @description Event type underwhich a case belongs to.
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
 *   _id: '5dde6ca33631a92c2d616298',
 *   strings: { name: { en: 'Flood' }, code: 'FL' },
 * }
 */
const type = {
  type: mongooseCommon.ObjectId,
  ref: predefine.Predefine.MODEL_NAME,
  // required: true,
  index: true,
  exists: true,
  aggregatable: { unwind: true },
  autopopulate: AUTOPOPULATE_OPTION_PREDEFINE,
  taggable: true,
  exportable: {
    format: (v) => lodash.get(v, 'strings.name.en'),
    default: 'NA',
  },
  default: undefined,
};

/**
 * @name event
 * @description Event underwhich a case belongs to.
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
 *   _id: '5dde6ca33631a92c2d616298',
 *   strings: { name: { en: 'Flood' }, code: 'FL' },
 * }
 */
const event = {
  type: mongooseCommon.ObjectId,
  ref: eweaEvent.Event.MODEL_NAME,
  // required: true,
  index: true,
  exists: true,
  aggregatable: { unwind: true },
  autopopulate: eweaEvent.Event.OPTION_AUTOPOPULATE,
  taggable: true,
  exportable: {
    format: (v) => lodash.get(v, 'strings.name.en'),
    default: 'NA',
  },
  default: undefined,
};

/**
 * @name stage
 * @description Currently assigned stage of a case.
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
 * @since 0.4.0
 * @version 0.1.0
 * @instance
 * @example
 * {
 *   _id: '5dde6ca23631a92c2d616250',
 *   strings: { name: { en: 'Confirmed' } },
 * }
 */
const stage = {
  type: mongooseCommon.ObjectId,
  ref: predefine.Predefine.MODEL_NAME,
  // required: true,
  index: true,
  exists: true,
  aggregatable: { unwind: true },
  autopopulate: AUTOPOPULATE_OPTION_PREDEFINE,
  taggable: true,
  exportable: {
    format: (v) => lodash.get(v, 'strings.name.en'),
    default: 'NA',
  },
  default: eweaCommon.DEFAULT_SEEDS[eweaInternals.PREDEFINE_NAMESPACE_CASESTAGE],
};

/**
 * @name severity
 * @description Currently assigned severity of a case.
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
 * @since 0.4.0
 * @version 0.1.0
 * @instance
 * @example
 * {
 *   _id: '5dde6ca23631a92c2d616250',
 *   strings: { name: { en: 'Extreme' } },
 * }
 */
const severity = {
  type: mongooseCommon.ObjectId,
  ref: predefine.Predefine.MODEL_NAME,
  // required: true,
  index: true,
  exists: true,
  aggregatable: { unwind: true },
  autopopulate: AUTOPOPULATE_OPTION_PREDEFINE,
  taggable: true,
  exportable: {
    format: (v) => lodash.get(v, 'strings.name.en'),
    default: 'NA',
  },
  default: eweaCommon.DEFAULT_SEEDS[eweaInternals.PREDEFINE_NAMESPACE_CASESEVERITY],
};

/**
 * @name number
 * @description Human readable, unique identifier of a case.
 *
 * It consist of two letters to identify the emergency event type
 * (e.g. FL - Flood); the year of the event; a six-digit, sequential
 * event number; and the three-letter ISO code for country of occurrence
 * e.g FL-2001-000033-TZA.
 *
 * @memberof Case
 *
 * @type {object}
 * @property {object} type - schema(data) type
 * @property {boolean} trim - force trimming
 * @property {boolean} uppercase - force value to uppercase
 * @property {boolean} required - mark required
 * @property {boolean} index - ensure database index
 * @property {boolean} unique - ensure unique database index
 * @property {boolean} searchable - allow searching
 * @property {boolean} taggable - allow field use for tagging
 * @property {boolean} exportable - allow field use for exporting
 * @property {object} fake - fake data generator options
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @instance
 * @example
 * FL-2018-000033-TZA
 */
const number = {
  type: String,
  trim: true,
  uppercase: true,
  required: true,
  index: true,
  // unique: true,
  searchable: true,
  taggable: true,
  exportable: true,
  sequenceable: {
    prefix: function prefix() {
      const year = moment(new Date()).format('YYYY-MM');
      return year;
    },
    suffix: COUNTRY_CODE,
    length: 4,
    pad: '0',
    separator: '-',
  },
  fake: {
    generator: 'random',
    type: 'uuid',
  },
};

/**
 * @name description
 * @description A brief summary about a case i.e additional
 * details that clarify more about a case.
 *
 * @memberof Case
 *
 * @type {object}
 * @property {object} type - schema(data) type
 * @property {boolean} trim - force trimming
 * @property {boolean} required - mark required
 * @property {boolean} index - ensure database index
 * @property {boolean} searchable - allow for searching
 * @property {boolean} exportable - allow field use for exporting
 * @property {object} fake - fake data generator options
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @instance
 * @example
 * Provide medical assistance on rescue mission.
 */
const description = {
  type: String,
  trim: true,
  // required: true,
  index: true,
  searchable: true,
  exportable: true,
  fake: {
    generator: 'lorem',
    type: 'sentence',
  },
};

/**
 * @name remarks
 * @description A brief human readable comments and feedbacks
 * about a case.
 *
 * @memberof Case
 *
 * @type {object}
 * @property {object} type - schema(data) type
 * @property {boolean} trim - force trimming
 * @property {boolean} index - ensure database index
 * @property {boolean} searchable - allow for searching
 * @property {boolean} exportable - allow field use for exporting
 * @property {object} fake - fake data generator options
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @instance
 * @example
 * Requested first aid were provided to the victim immediately.
 */
const remarks = {
  type: String,
  trim: true,
  index: true,
  searchable: true,
  exportable: true,
  fake: {
    generator: 'lorem',
    type: 'sentence',
  },
};

/**
 * @name outcome
 * @description An outcome of about a case followup.
 *
 * @memberof Case
 *
 * @type {object}
 * @property {object} type - schema(data) type
 * @property {boolean} trim - force trimming
 * @property {boolean} index - ensure database index
 * @property {boolean} searchable - allow for searching
 * @property {boolean} exportable - allow field use for exporting
 * @property {object} fake - fake data generator options
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @instance
 * @example
 * Home
 */
const outcome = {
  type: String,
  trim: true,
  index: true,
  searchable: true,
  exportable: true,
  fake: {
    generator: 'lorem',
    type: 'sentence',
  },
};

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
const reporter = {
  type: mongooseCommon.ObjectId,
  ref: emisStakeholder.Party.MODEL_NAME,
  // required: true,
  index: true,
  exists: true,
  autopopulate: AUTOPOPULATE_OPTION_PARTY,
  taggable: true,
  exportable: {
    format: (v) => lodash.get(v, 'name'),
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
const resolver = {
  type: mongooseCommon.ObjectId,
  ref: emisStakeholder.Party.MODEL_NAME,
  // required: true,
  index: true,
  exists: true,
  autopopulate: AUTOPOPULATE_OPTION_PARTY,
  taggable: true,
  exportable: {
    format: (v) => lodash.get(v, 'name'),
    default: 'NA',
  },
  aggregatable: { unwind: true },
  default: undefined,
};

/**
 * @name follower
 * @description A party(i.e call center or EOC operator) who
 * made a latest follow-up on a case.
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
const follower = {
  type: mongooseCommon.ObjectId,
  ref: emisStakeholder.Party.MODEL_NAME,
  // required: true,
  index: true,
  exists: true,
  autopopulate: AUTOPOPULATE_OPTION_PARTY,
  taggable: true,
  exportable: {
    format: (v) => lodash.get(v, 'name'),
    default: 'NA',
  },
  aggregatable: { unwind: true },
  default: undefined,
};

// TODO: map them against case statuses

/**
 * @name reportedAt
 * @description Date when a case was recorded(or requested).
 *
 * @memberof Case
 *
 * @type {object}
 * @property {object} type - schema(data) type
 * @property {boolean} index - ensure database index
 * @property {object} fake - fake data generator options
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @instance
 * @example
 * 2018-10-17T07:53:32.831Z
 */
const reportedAt = {
  type: Date,
  index: true,
  exportable: true,
  fake: {
    generator: 'date',
    type: 'past',
  },
};

/**
 * @name resolvedAt
 * @description Date when a case resolved(i.e discharged).
 *
 * @memberof Case
 *
 * @type {object}
 * @property {object} type - schema(data) type
 * @property {boolean} index - ensure database index
 * @property {object} fake - fake data generator options
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @instance
 * @example
 * 2018-10-19T07:55:32.831Z
 */
const resolvedAt = {
  type: Date,
  index: true,
  exportable: true,
  fake: {
    generator: 'date',
    type: 'recent',
  },
};

/**
 * @name followedAt
 * @description Latest date when a case followed up after discharged.
 *
 * @memberof Case
 *
 * @type {object}
 * @property {object} type - schema(data) type
 * @property {boolean} index - ensure database index
 * @property {object} fake - fake data generator options
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.3.0
 * @version 0.1.0
 * @instance
 * @example
 * 2018-10-19T07:55:32.831Z
 */
const followedAt = {
  type: Date,
  index: true,
  exportable: true,
  fake: {
    generator: 'date',
    type: 'recent',
  },
};

const DEFAULT_LOCALE = env.getString('DEFAULT_LOCALE', 'en');
const LOCALES = env.getStrings('LOCALES', DEFAULT_LOCALE);

/**
 * @name properties
 * @description A map of key value pairs to allow to associate
 * other meaningful information to a case.
 *
 * @type {object}
 * @property {object} type - schema(data) type
 * @property {object} fake - fake data generator options
 *
 * @since 0.2.0
 * @version 0.1.0
 * @instance
 * @example
 * {
 *   "population": {
 *     "male": 1700000,
 *     "female": 2700000
 *    }
 * }
 */
const properties = {
  type: Map,
  of: mongooseCommon.Mixed,
  fake: (f) => f.helpers.createTransaction(),
};

/**
 * @name locale
 * @description Defines the party's language, region and any
 * special variant preferences.
 *
 * @see {@link https://en.wikipedia.org/wiki/Locale_(computer_software)}
 *
 * @type {object}
 * @property {object} type - schema(data) type
 * @property {boolean} trim - force trimming
 * @property {boolean} enum - list of acceptable values
 * @property {boolean} index - ensure database index
 * @property {boolean} searchable - allow for searching
 * @property {boolean} taggable - allow field use for tagging
 * @property {boolean} default - default value set when none provided
 * @property {object} fake - fake data generator options
 *
 * @since 0.1.0
 * @version 0.1.0
 * @instance
 * @example
 * en
 */
const locale = {
  type: String,
  trim: true,
  enum: LOCALES,
  index: true,
  searchable: true,
  taggable: true,
  default: DEFAULT_LOCALE,
  fake: true,
};

/**
 * @name name
 * @description Full name name of the party(i.e individual).
 *
 *
 * @property {object} type - schema(data) type
 * @property {boolean} trim - force trimming
 * @property {boolean} startcase - ensure start case(or title case)
 * @property {boolean} index - ensure database index
 * @property {boolean} searchable - allow for searching
 * @property {boolean} taggable - allow field use for tagging
 * @property {boolean} exportable - allow field use for exporting
 * @property {object} fake - fake data generator options
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @instance
 * @example
 * Jane Doe
 */
const name = {
  type: String,
  trim: true,
  startcase: true,
  index: true,
  searchable: true,
  taggable: true,
  exportable: true,
  fake: {
    generator: 'name',
    type: 'findName',
  },
};

/**
 * @name age
 * @description Current age of the party(i.e individual).
 *
 *
 * @property {object} type - schema(data) type
 * @property {boolean} trim - force trimming
 * @property {boolean} index - ensure database index
 * @property {object} fake - fake data generator options
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @instance
 * @example
 * 23
 */
const age = {
  type: Number,
  index: true,
  exportable: true,
  fake: (f) => f.random.number({ min: 1, max: 100 }),
};

/**
 * @name weight
 * @description Current weight of the party(i.e individual).
 *
 *
 * @property {object} type - schema(data) type
 * @property {boolean} trim - force trimming
 * @property {boolean} index - ensure database index
 * @property {object} fake - fake data generator options
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @instance
 * @example
 * 53
 */
const weight = {
  type: Number,
  index: true,
  exportable: true,
  fake: (f) => f.random.number({ min: 1, max: 250 }),
};

/**
 * @name score
 * @description Current score of the case followup.
 *
 * It used to derive case severity.
 *
 * @property {object} type - schema(data) type
 * @property {boolean} trim - force trimming
 * @property {boolean} index - ensure database index
 * @property {object} fake - fake data generator options
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @instance
 * @example
 * 4
 */
const score = {
  type: Number,
  index: true,
  exportable: true,
  fake: (f) => f.random.number({ min: 0, max: 5 }),
};

/**
 * @name mobile
 * @description A mobile phone number of the party(i.e individual).
 *
 * @property {object} type - schema(data) type
 * @property {boolean} trim - force trimming
 * @property {boolean} index - ensure database index
 * @property {boolean} searchable - allow for searching
 * @property {boolean} taggable - allow field use for tagging
 * @property {boolean} exportable - allow field use for exporting
 * @property {object} fake - fake data generator options
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @instance
 * @example
 * 255714989796
 */
const mobile = {
  type: String,
  trim: true,
  index: true,
  searchable: true,
  taggable: true,
  exportable: true,
  fake: (f) => f.helpers.replaceSymbolWithNumber('255714######'),
};

/**
 * @name email
 * @description Email address of the party(i.e individual).
 *
 * @type {object}
 * @property {object} type - schema(data) type
 * @property {boolean} trim - force trimming
 * @property {boolean} lowercase - force lower-casing
 * @property {boolean} email - force to be a valid email address
 * @property {boolean} index - ensure database index
 * @property {boolean} searchable - allow for searching
 * @property {boolean} taggable - allow field use for tagging
 * @property {object} fake - fake data generator options
 *
 * @since 0.1.0
 * @version 0.1.0
 * @instance
 * @example
 * jane.doe@example.com
 */
const email = {
  type: String,
  trim: true,
  lowercase: true,
  email: true,
  index: true,
  searchable: true,
  taggable: true,
  exportable: true,
  fake: (f) => f.internet.email(),
};

/**
 * @name address
 * @description A human readable description of location.
 *
 * @property {object} type - schema(data) type
 * @property {boolean} trim - force trimming
 * @property {boolean} index - ensure database index
 * @property {boolean} searchable - allow for searching
 * @property {boolean} taggable - allow field use for tagging
 * @property {boolean} exportable - allow field use for exporting
 * @property {object} fake - fake data generator options
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @instance
 * @example
 * Tandale
 */
const address = {
  type: String,
  trim: true,
  index: true,
  searchable: true,
  taggable: true,
  exportable: true,
  fake: {
    generator: 'address',
    type: 'county',
  },
};

/**
 * @name referral
 * @description Referral number of the party(i.e patient or victim).
 *
 *
 * @property {object} type - schema(data) type
 * @property {boolean} trim - force trimming
 * @property {boolean} index - ensure database index
 * @property {boolean} searchable - allow for searching
 * @property {boolean} taggable - allow field use for tagging
 * @property {boolean} exportable - allow field use for exporting
 * @property {object} fake - fake data generator options
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @instance
 * @example
 * AMN-5657
 */
const referral = {
  type: String,
  trim: true,
  index: true,
  searchable: true,
  taggable: true,
  exportable: true,
  fake: {
    generator: 'finance',
    type: 'account',
  },
};

/**
 * @name pcr
 * @description Patient care record number of the
 * party(i.e patient or victim).
 *
 *
 * @property {object} type - schema(data) type
 * @property {boolean} trim - force trimming
 * @property {boolean} index - ensure database index
 * @property {boolean} searchable - allow for searching
 * @property {boolean} taggable - allow field use for tagging
 * @property {boolean} exportable - allow field use for exporting
 * @property {object} fake - fake data generator options
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @instance
 * @example
 * PTN-8687
 */
const pcr = {
  type: String,
  trim: true,
  index: true,
  searchable: true,
  taggable: true,
  exportable: true,
  fake: {
    generator: 'finance',
    type: 'account',
  },
};

/**
 * @name area
 * @description Assignable administrative area of a party.
 *
 * @type {object}
 * @property {object} type - schema(data) type
 * @property {string} ref - referenced model(or collection)
 * @property {boolean} index - ensure database index
 * @property {boolean} exists - ensure ref exists before save
 * @property {object} autopopulate - auto population(eager loading) options
 * @property {boolean} taggable - allow field use for tagging
 *
 * @since 1.1.0
 * @version 0.1.0
 * @instance
 * @example
 * {
 *   "name": {"en": "Dar es Salaam"}
 * }
 */
const area = {
  type: mongooseCommon.ObjectId,
  ref: predefine.Predefine.MODEL_NAME,
  index: true,
  exists: true,
  aggregatable: { unwind: true },
  autopopulate: AUTOPOPULATE_OPTION_AREA,
  taggable: true,
  exportable: {
    header: 'Area',
    format: (v) => {
      return v && v.strings && common.compact([v.strings.name.en]).join(' - ');
    },
    order: 3,
    default: 'NA',
  },
  default: eweaCommon.DEFAULT_SEEDS[eweaInternals.PREDEFINE_NAMESPACE_ADMINISTRATIVEAREA],
};

/**
 * @name facility
 * @description Assignable treatment facility(i.e Hospital etc).
 *
 * @type {object}
 * @property {object} type - schema(data) type
 * @property {string} ref - referenced model(or collection)
 * @property {boolean} index - ensure database index
 * @property {boolean} exists - ensure ref exists before save
 * @property {object} autopopulate - auto population(eager loading) options
 * @property {boolean} taggable - allow field use for tagging
 *
 * @since 1.1.0
 * @version 0.1.0
 * @instance
 * @example
 * {
 *   "name": {"en": "Amana Hospital"}
 * }
 */
const facility = {
  type: mongooseCommon.ObjectId,
  ref: predefine.Predefine.MODEL_NAME,
  index: true,
  exists: true,
  aggregatable: { unwind: true },
  autopopulate: AUTOPOPULATE_OPTION_PREDEFINE,
  taggable: true,
  exportable: {
    header: 'Facility',
    format: (v) => {
      return v && v.strings && common.compact([v.strings.name.en]).join(' - ');
    },
    order: 3,
    default: 'NA',
  },
};

/**
 * @name gender
 * @description Assignable or given gender to a party.
 *
 * @type {object}
 * @property {object} type - schema(data) type
 * @property {string} ref - referenced collection
 * @property {boolean} index - ensure database index
 * @property {boolean} exists - ensure ref exists before save
 * @property {object} autopopulate - population options
 * @property {boolean} taggable - allow field use for tagging
 * @property {boolean} default - default value set when none provided
 *
 * @since 0.1.0
 * @version 0.1.0
 * @instance
 * @example
 * {
 *   "name": { "en" : "Female" }
 * }
 */
const gender = {
  type: mongooseCommon.ObjectId,
  ref: predefine.Predefine.MODEL_NAME,
  index: true,
  exists: true,
  aggregatable: { unwind: true },
  autopopulate: AUTOPOPULATE_OPTION_PREDEFINE,
  taggable: true,
  exportable: {
    header: 'Gender',
    format: (v) => {
      return v && v.strings && common.compact([v.strings.name.en]).join(' - ');
    },
    order: 2,
    default: 'NA',
  },
  default: eweaCommon.DEFAULT_SEEDS[eweaInternals.PREDEFINE_NAMESPACE_PARTYGENDER],
};

/**
 * @name occupation
 * @description Assignable or given occupation to a party.
 *
 * @type {object}
 * @property {object} type - schema(data) type
 * @property {string} ref - referenced collection
 * @property {boolean} index - ensure database index
 * @property {boolean} exists - ensure ref exists before save
 * @property {object} autopopulate - population options
 * @property {boolean} taggable - allow field use for tagging
 * @property {boolean} default - default value set when none provided
 *
 * @since 0.1.0
 * @version 0.1.0
 * @instance
 * @example
 * {
 *   "name": { "en" : "Unknown" }
 * }
 */
const occupation = {
  type: mongooseCommon.ObjectId,
  ref: predefine.Predefine.MODEL_NAME,
  index: true,
  exists: true,
  aggregatable: { unwind: true },
  autopopulate: AUTOPOPULATE_OPTION_PREDEFINE,
  taggable: true,
  exportable: {
    header: 'Occupation',
    format: (v) => {
      return v && v.strings && common.compact([v.strings.name.en]).join(' - ');
    },
    order: 2,
    default: 'NA',
  },
  default: eweaCommon.DEFAULT_SEEDS[eweaInternals.PREDEFINE_NAMESPACE_PARTYOCCUPATION],
};

/**
 * @name nationality
 * @description Assignable or given nationality to a party.
 *
 * @type {object}
 * @property {object} type - schema(data) type
 * @property {string} ref - referenced collection
 * @property {boolean} index - ensure database index
 * @property {boolean} exists - ensure ref exists before save
 * @property {object} autopopulate - population options
 * @property {boolean} taggable - allow field use for tagging
 * @property {boolean} default - default value set when none provided
 *
 * @since 0.2.0
 * @version 0.1.0
 * @instance
 * @example
 * {
 *   "name": { "en" : "Tanzanian" }
 * }
 */
const nationality = {
  type: mongooseCommon.ObjectId,
  ref: predefine.Predefine.MODEL_NAME,
  index: true,
  exists: true,
  aggregatable: { unwind: true },
  autopopulate: AUTOPOPULATE_OPTION_PREDEFINE,
  taggable: true,
  exportable: {
    header: 'Nationality',
    format: (v) => {
      return v && v.strings && common.compact([v.strings.name.en]).join(' - ');
    },
    order: 2,
    default: 'NA',
  },
  default: eweaCommon.DEFAULT_SEEDS[eweaInternals.PREDEFINE_NAMESPACE_PARTYNATIONALITY],
};

/**
 * @name nextOfKin
 * @description A party who closest to a victim.
 *
 * @type {object}
 * @property {string} name - Full name of the next of kin
 * @property {string} mobile - Mobile phone number of the next of kin
 * @property {string} email - Email address of the next of kin
 * @property {string} locale - Locale of the next of kin
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @instance
 * @example
 * {
 *   name: "Jane Doe",
 *   mobile: "+255715463739"
 *   email: "jane.doe@example.com"
 *   locale: "en"
 * }
 */
const nextOfKin = mongooseCommon.createSubSchema({
  name,
  mobile,
  email,
  locale,
  // csids,
});

/**
 * @name victim
 * @description A party(i.e patient or victim) whom a case is for.
 *
 * @type {object}
 * @property {string} referral - Valid referral number
 * @property {string} pcr - Valid patient care number
 * @property {string} name - Full name of the victim
 * @property {string} mobile - Mobile phone number of the victim
 * @property {string} email - Email address of the victim
 * @property {object} gender - Gender of the victim
 * @property {number} age - Age of the victim
 * @property {number} weight - Weight of the victim
 * @property {object} occupation - Occupation of the victim
 * @property {object} nationality - Nationality of the victim
 * @property {string} address - Address of the victim
 * @property {string} locale - Locale of the victim
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.2.0
 * @instance
 * @example
 * {
 *   referral: "AMN-5657",
 *   pcr: "PTN-8687",
 *   name: "Jane Doe",
 *   mobile: "+255715463739",
 *   email: "jane.doe@example.com",
 *   gender: { name: { en: "Female"} },
 *   age: 23,
 *   weight: 53,
 *   occupation: { name: { en: "Businessman"} },
 *   nationality: { name: { en: "Tanzanian"} },
 *   address: "Tandale",
 *   area: { name: { en: "Dar es Salaam"} },
 *   locale: "en",
 *   nextOfKin: { name: "Halima Mdoe", mobile: "+255715463740" }
 * }
 */
const victim = mongooseCommon.createSubSchema({
  referral,
  pcr,
  name,
  mobile,
  email,
  gender,
  age,
  // dob
  weight,
  occupation,
  nationality,
  address,
  area,
  locale,
  nextOfKin,
  // csids.
});

/**
 * @name followup
 * @description A party(i.e doctor or nurse) who followed case victim.
 *
 * @type {object}
 * @property {object} follower - Following party
 * @property {Date} followedAt - Latest date followed
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.2.0
 * @instance
 * @example
 * {
 *   follower: {_id: "5bcda2c073dd0700048fb846", name: "Jane Doe" }
 *   followedAt: '2018-10-19T07:55:32.831Z',
 *   symptoms: { cough: 5 },
 *   outcome: 'Hospital',
 *   remarks: 'Handled'
 * }
 */
const followup = mongooseCommon.createSubSchema({
  follower,
  followedAt,
  symptoms: properties,
  score, // TODO: systemScore vs followerScore
  outcome,
  remarks,
});

const SCHEMA = common.mergeObjects(
  { number },
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
const CaseSchema = mongooseCommon.createSchema(
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
  if (!lodash.get(this, 'stage')) {
    const staje = eweaInternals.DEFAULT_SEEDS[eweaInternals.PREDEFINE_NAMESPACE_CASESTAGE];
    lodash.set(this, 'stage', staje);
  }

  // TODO: compute score
  // TODO: move score to case base schema
  // always: ensure case severity from followup score
  const score = lodash.get(this, 'followup.score');
  this.severity = eweaCommon.caseSeverityFor({ score });

  // ensure victim gender
  if (!lodash.get(this, 'victim.gender')) {
    const gender = eweaInternals.DEFAULT_SEEDS[eweaInternals.PREDEFINE_NAMESPACE_PARTYGENDER];
    lodash.set(this, 'victim.gender', gender);
  }

  // ensure victim default occupation
  if (!lodash.get(this, 'victim.occupation')) {
    const occupation = eweaInternals.DEFAULT_SEEDS[eweaInternals.PREDEFINE_NAMESPACE_PARTYOCCUPATION];
    lodash.set(this, 'victim.occupation', occupation);
  }

  // ensure victim default nationality
  if (!lodash.get(this, 'victim.nationality')) {
    const nationality = eweaInternals.DEFAULT_SEEDS[eweaInternals.PREDEFINE_NAMESPACE_PARTYNATIONALITY];
    lodash.set(this, 'victim.nationality', nationality);
  }

  // ensure victim default area
  if (!lodash.get(this, 'victim.area')) {
    const area = eweaInternals.DEFAULT_SEEDS[eweaInternals.PREDEFINE_NAMESPACE_ADMINISTRATIVEAREA];
    lodash.set(this, 'victim.area', area);
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
CaseSchema.statics.MODEL_NAME = eweaInternals.MODEL_NAME_CASE;
CaseSchema.statics.COLLECTION_NAME = eweaInternals.COLLECTION_NAME_CASE;
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
  const copyOfSeed = mongooseCommon.copyInstance(seed);

  const criteria = common.idOf(copyOfSeed)
    ? lodash.pick(copyOfSeed, '_id')
    : lodash.pick(copyOfSeed, 'number');

  return criteria;
};

/* export case model */
const Case = mongooseCommon.model(eweaInternals.MODEL_NAME_CASE, CaseSchema);

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
const ensureReporter = (request, response, next) => {
  if (request.body && request.party) {
    request.body.reporter = request.body.reporter || request.party;
  }
  return next();
};

/* constants */
const API_VERSION = env.getString('API_VERSION', '1.0.0');
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
const router = new expressRestActions.Router({
  version: API_VERSION,
});

/**
 * @name GetCasees
 * @memberof CaseHttpRouter
 * @description Returns a list of cases
 */
router.get(
  PATH_LIST,
  expressRestActions.getFor({
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
  expressRestActions.schemaFor({
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
  expressRestActions.downloadFor({
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
  expressRestActions.postFor({
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
  expressRestActions.getByIdFor({
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
  expressRestActions.patchFor({
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
  expressRestActions.putFor({
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
  expressRestActions.deleteFor({
    del: (options, done) => Case.del(options, done),
    soft: true,
  })
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
 * @since 0.1.0
 * @version 0.1.0
 * @license MIT
 * @example
 *
 * const { Case, start } = require('@codetanzania/ewea-case');
 * start(error => { ... });
 *
 */

/**
 * @name info
 * @description package information
 * @type {object}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 1.0.0
 * @version 0.1.0
 */
const info = common.pkg(
  `${__dirname}/package.json`,
  'name',
  'description',
  'version',
  'license',
  'homepage',
  'repository',
  'bugs',
  'sandbox',
  'contributors'
);

/**
 * @name apiVersion
 * @description http router api version
 * @type {string}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 */
const apiVersion = env.apiVersion();

/**
 * @function start
 * @name start
 * @description start http server
 * @param {Function} done callback to invoke on success or error
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 */
const start = (done) => {
  // connect mongodb
  mongooseCommon.connect((error) => {
    // back-off on connect error
    if (error) {
      return done(error);
    }

    // ensure file models
    file.createModels();

    // mount case router
    expressCommon.mount(router);

    // start http server
    return expressRestActions.start(done);
  });
};

exports.Case = Case;
exports.apiVersion = apiVersion;
exports.caseRouter = router;
exports.info = info;
exports.start = start;
