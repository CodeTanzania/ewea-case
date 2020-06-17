import {
  POPULATION_MAX_DEPTH,
  COLLECTION_NAME_CASE,
} from '@codetanzania/ewea-internals';
import { getString } from '@lykmapipo/env';

// common constants
export const DEFAULT_COUNTRY_CODE = getString('DEFAULT_COUNTRY_CODE', 'TZ');
export const COUNTRY_CODE = getString('COUNTRY_CODE', DEFAULT_COUNTRY_CODE);

// case schema
export const CASE_SCHEMA_OPTIONS = {
  collection: COLLECTION_NAME_CASE,
};

// case options
export const CASE_OPTION_SELECT = {
  number: 1,
};
export const CASE_OPTION_AUTOPOPULATE = {
  select: CASE_OPTION_SELECT,
  maxDepth: POPULATION_MAX_DEPTH,
};

// relation options

// TODO: refactor to ewea-internals
export const AUTOPOPULATE_OPTION_PREDEFINE = {
  select: {
    'strings.name': 1,
    'strings.color': 1,
    'strings.code': 1,
  },
  maxDepth: POPULATION_MAX_DEPTH,
};

// TODO: refactor to ewea-internals
export const AUTOPOPULATE_OPTION_AREA = {
  select: {
    'strings.name': 1,
    'strings.color': 1,
    'strings.code': 1,
    'relations.level': 1,
  },
  maxDepth: 2,
};

// TODO: refactor to ewea-internals
export const AUTOPOPULATE_OPTION_PARTY = {
  select: { name: 1, email: 1, mobile: 1, abbreviation: 1, role: 1 },
  maxDepth: 2,
};

export const sendFollowupRequest = () => {
  // TODO: if requested has no campaign
  // TODO: if request.campaign failed
};
export const sendFollowupResult = () => {
  // TODO: if verified has no campaign
  // TODO: if verifiried.campaign failed
};
