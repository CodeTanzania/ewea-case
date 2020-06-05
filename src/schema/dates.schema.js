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
export const reportedAt = {
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
export const resolvedAt = {
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
export const followedAt = {
  type: Date,
  index: true,
  exportable: true,
  fake: {
    generator: 'date',
    type: 'recent',
  },
};
