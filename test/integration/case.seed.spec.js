import path from 'path';
import { first } from 'lodash';
import { clear, expect } from '@lykmapipo/mongoose-test-helpers';
import { seedCommons, seedDefaults } from '@codetanzania/ewea-common';
import { Case } from '../../src';

describe('Case Seed', () => {
  const { SEED_PATH } = process.env;
  let caze;

  before((done) => clear(done));

  before(() => {
    process.env.SEED_PATH = path.join(__dirname, '..', 'fixtures');
  });

  before((done) => seedDefaults(done));
  before((done) => seedCommons(done));

  it('should be able to seed', (done) => {
    Case.seed((error, seeded) => {
      expect(error).to.not.exist;
      expect(seeded).to.exist;
      expect(seeded).to.length.at.least(1);
      caze = first(seeded);
      done(error, seeded);
    });
  });

  it('should not throw if seed exist', (done) => {
    Case.seed((error, seeded) => {
      expect(error).to.not.exist;
      expect(seeded).to.exist;
      expect(seeded).to.length.at.least(1);
      done(error, seeded);
    });
  });

  it('should seed provided', (done) => {
    const seed = Case.fake().toObject();
    Case.seed(seed, (error, seeded) => {
      expect(error).to.not.exist;
      expect(seeded).to.exist;
      expect(seeded).to.length.at.least(1);
      done(error, seeded);
    });
  });

  it('should seed provided', (done) => {
    const seed = Case.fake().toObject();
    Case.seed([seed], (error, seeded) => {
      expect(error).to.not.exist;
      expect(seeded).to.exist;
      expect(seeded).to.length.at.least(1);
      done(error, seeded);
    });
  });

  it('should not throw if provided exist', (done) => {
    const seed = caze.toObject();
    Case.seed(seed, (error, seeded) => {
      expect(error).to.not.exist;
      expect(seeded).to.exist;
      expect(seeded).to.length.at.least(1);
      done(error, seeded);
    });
  });

  it('should be able to seed from environment', (done) => {
    Case.seed((error, seeded) => {
      expect(error).to.not.exist;
      expect(seeded).to.exist;
      expect(seeded).to.length.at.least(1);
      done(error, seeded);
    });
  });

  it('should not throw if seed from environment exist', (done) => {
    Case.seed((error, seeded) => {
      expect(error).to.not.exist;
      expect(seeded).to.exist;
      expect(seeded).to.length.at.least(1);
      done(error, seeded);
    });
  });

  after((done) => clear(done));

  after(() => {
    process.env.SEED_PATH = SEED_PATH;
  });
});
