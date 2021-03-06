import {
  PREDEFINE_NAMESPACE_ADMINISTRATIVEAREA,
  PREDEFINE_NAMESPACE_PARTYGENDER,
  PREDEFINE_NAMESPACE_PARTYOCCUPATION,
  PREDEFINE_NAMESPACE_PARTYNATIONALITY,
} from '@codetanzania/ewea-internals';
import { DEFAULT_SEEDS } from '@codetanzania/ewea-common';
import { compact } from '@lykmapipo/common';
import { getString, getStrings } from '@lykmapipo/env';
import { Point } from 'mongoose-geojson-schemas';
import { ObjectId, Mixed, createSubSchema } from '@lykmapipo/mongoose-common';
import { Predefine } from '@lykmapipo/predefine';

import {
  AUTOPOPULATE_OPTION_PREDEFINE,
  AUTOPOPULATE_OPTION_AREA,
} from '../internals';

import { follower } from './parties.schema';
import { followedAt } from './dates.schema';
import { outcome, remarks } from './base.schema';

const DEFAULT_LOCALE = getString('DEFAULT_LOCALE', 'en');
const LOCALES = getStrings('LOCALES', DEFAULT_LOCALE);

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
export const properties = {
  type: Map,
  of: Mixed,
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
export const locale = {
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
export const name = {
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
export const age = {
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
export const weight = {
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
export const score = {
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
export const mobile = {
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
export const email = {
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
 * @name location
 * @description A geo-point specifying longitude and latitude pair
 * of the address.
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
 * {
 *   type: 'Point',
 *   coordinates: [39.2155451, -6.7269984],
 * }
 */
export const location = Point;

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
export const address = {
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
export const referral = {
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
export const pcr = {
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
export const area = {
  type: ObjectId,
  ref: Predefine.MODEL_NAME,
  index: true,
  exists: true,
  aggregatable: { unwind: true },
  autopopulate: AUTOPOPULATE_OPTION_AREA,
  taggable: true,
  exportable: {
    header: 'Area',
    format: (v) => {
      return v && v.strings && compact([v.strings.name.en]).join(' - ');
    },
    order: 3,
    default: 'NA',
  },
  default: DEFAULT_SEEDS[PREDEFINE_NAMESPACE_ADMINISTRATIVEAREA],
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
export const facility = {
  type: ObjectId,
  ref: Predefine.MODEL_NAME,
  index: true,
  exists: true,
  aggregatable: { unwind: true },
  autopopulate: AUTOPOPULATE_OPTION_PREDEFINE,
  taggable: true,
  exportable: {
    header: 'Facility',
    format: (v) => {
      return v && v.strings && compact([v.strings.name.en]).join(' - ');
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
export const gender = {
  type: ObjectId,
  ref: Predefine.MODEL_NAME,
  index: true,
  exists: true,
  aggregatable: { unwind: true },
  autopopulate: AUTOPOPULATE_OPTION_PREDEFINE,
  taggable: true,
  exportable: {
    header: 'Gender',
    format: (v) => {
      return v && v.strings && compact([v.strings.name.en]).join(' - ');
    },
    order: 2,
    default: 'NA',
  },
  default: DEFAULT_SEEDS[PREDEFINE_NAMESPACE_PARTYGENDER],
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
export const occupation = {
  type: ObjectId,
  ref: Predefine.MODEL_NAME,
  index: true,
  exists: true,
  aggregatable: { unwind: true },
  autopopulate: AUTOPOPULATE_OPTION_PREDEFINE,
  taggable: true,
  exportable: {
    header: 'Occupation',
    format: (v) => {
      return v && v.strings && compact([v.strings.name.en]).join(' - ');
    },
    order: 2,
    default: 'NA',
  },
  default: DEFAULT_SEEDS[PREDEFINE_NAMESPACE_PARTYOCCUPATION],
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
export const nationality = {
  type: ObjectId,
  ref: Predefine.MODEL_NAME,
  index: true,
  exists: true,
  aggregatable: { unwind: true },
  autopopulate: AUTOPOPULATE_OPTION_PREDEFINE,
  taggable: true,
  exportable: {
    header: 'Nationality',
    format: (v) => {
      return v && v.strings && compact([v.strings.name.en]).join(' - ');
    },
    order: 2,
    default: 'NA',
  },
  default: DEFAULT_SEEDS[PREDEFINE_NAMESPACE_PARTYNATIONALITY],
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
export const nextOfKin = createSubSchema({
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
export const victim = createSubSchema({
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
  // TODO: csids.
  // TODO: lastKnownLocation
  // TODO: lastKnownAddress
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
export const followup = createSubSchema({
  follower,
  followedAt,
  symptoms: properties, // TODO: rename to data/instance/results
  score, // TODO: systemScore vs followerScore
  outcome,
  remarks,
});
