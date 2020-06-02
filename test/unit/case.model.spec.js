import { omit } from 'lodash';
import { expect } from '@lykmapipo/mongoose-test-helpers';
import Case from '../../src/case.model';

describe('Case Instance', () => {
  it('should have pre validate logics', () => {
    const caze = Case.fake();
    expect(caze.preValidate).to.exist;
    expect(caze.preValidate).to.be.a('function');
    expect(caze.preValidate.length).to.be.equal(1);
    expect(caze.preValidate.name).to.be.equal('preValidate');
  });

  it('should set reportedAt on pre validate', (done) => {
    const caze = Case.fakeExcept('reportedAt');

    expect(caze.reportedAt).to.not.exist;
    caze.preValidate((error) => {
      expect(caze.reportedAt).to.exist;
      done(error);
    });
  });
});

describe.skip('Case Validations', () => {
  // TODO: seedCommons
  it('should generate number', (done) => {
    const caze = Case.fakeExcept('number');
    // expect(caze.number).to.not.exist;
    caze.validate((error) => {
      expect(error).to.not.exist;
      expect(caze.number).to.exist;
      expect(caze.number).to.contain('TZ');
      done(error, caze);
    });
  });
});

describe('Case Statics', () => {
  it('should expose model name', () => {
    expect(Case.MODEL_NAME).to.exist;
    expect(Case.MODEL_NAME).to.be.equal('Case');
  });

  it('should expose collection name', () => {
    expect(Case.COLLECTION_NAME).to.exist;
    expect(Case.COLLECTION_NAME).to.be.equal('cases');
  });

  it('should expose select options', () => {
    expect(Case.OPTION_SELECT).to.exist;
    expect(Case.OPTION_SELECT).to.be.eql({
      number: 1,
    });
  });

  it('should expose autopopulate options', () => {
    expect(Case.OPTION_AUTOPOPULATE).to.exist;
    expect(Case.OPTION_AUTOPOPULATE).to.be.eql({
      select: {
        number: 1,
      },
      maxDepth: 1,
    });
  });

  it('should prepare seed criteria', () => {
    const { _id, ...rest } = Case.fake().toObject();
    const seed = Case.prepareSeedCriteria(rest);
    expect(seed).to.exist;
    expect(seed.number).to.exist;
  });

  it('should prepare seed criteria from object id', () => {
    const caze = Case.fake().toObject();
    const seed = Case.prepareSeedCriteria(caze);
    expect(seed).to.exist;
    expect(seed._id).to.exist;
  });

  it('should prepare seed criteria from object id', () => {
    const caze = omit(Case.fake().toObject(), '_id');
    const seed = Case.prepareSeedCriteria(caze);
    expect(seed).to.exist;
    expect(seed._id).to.not.exist;
  });
});

describe('Case Faker', () => {
  it('should fake number', () => {
    const caze = Case.fake();
    expect(caze.number).to.exist.and.be.a('string');
  });
});
