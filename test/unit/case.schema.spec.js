import { SchemaTypes } from '@lykmapipo/mongoose-common';
import { expect } from '@lykmapipo/mongoose-test-helpers';
import { Party } from '@codetanzania/emis-stakeholder';
import Case from '../../src/case.model';

describe('Case Schema', () => {
  it('should have number field', () => {
    const number = Case.path('number');

    expect(number).to.exist;
    expect(number).to.be.instanceof(SchemaTypes.String);
    expect(number.options).to.exist;
    expect(number.options).to.be.an('object');
    expect(number.options.type).to.exist;
    expect(number.options.trim).to.be.true;
    expect(number.options.uppercase).to.be.true;
    expect(number.options.index).to.be.true;
    // expect(number.options.unique).to.be.true;
    // expect(number.options.required).to.be.true;
    expect(number.options.searchable).to.be.true;
    expect(number.options.taggable).to.be.true;
    expect(number.options.fake).to.exist;
  });

  it('should have victim field', () => {
    const victim = Case.path('victim');
    const referral = Case.path('victim.referral');
    const pcr = Case.path('victim.pcr');
    const name = Case.path('victim.name');
    const mobile = Case.path('victim.mobile');
    const nextOfKinName = Case.path('victim.nextOfKin.name');
    const nextOfKinMobile = Case.path('victim.nextOfKin.mobile');

    expect(victim).to.exist;
    expect(victim).to.be.an.instanceof(SchemaTypes.Embedded);

    expect(referral).to.exist;
    expect(referral).to.be.instanceof(SchemaTypes.String);
    expect(referral.options).to.exist;
    expect(referral.options).to.be.an('object');
    expect(referral.options.type).to.exist;
    expect(referral.options.trim).to.be.true;
    expect(referral.options.index).to.be.true;
    expect(referral.options.searchable).to.be.true;
    expect(referral.options.taggable).to.be.true;
    expect(referral.options.exportable).to.be.true;
    expect(referral.options.fake).to.exist;

    expect(pcr).to.exist;
    expect(pcr).to.be.instanceof(SchemaTypes.String);
    expect(pcr.options).to.exist;
    expect(pcr.options).to.be.an('object');
    expect(pcr.options.type).to.exist;
    expect(pcr.options.trim).to.be.true;
    expect(pcr.options.index).to.be.true;
    expect(pcr.options.searchable).to.be.true;
    expect(pcr.options.taggable).to.be.true;
    expect(pcr.options.exportable).to.be.true;
    expect(pcr.options.fake).to.exist;

    expect(name).to.exist;
    expect(name).to.be.instanceof(SchemaTypes.String);
    expect(name.options).to.exist;
    expect(name.options).to.be.an('object');
    expect(name.options.type).to.exist;
    expect(name.options.trim).to.be.true;
    expect(name.options.index).to.be.true;
    expect(name.options.searchable).to.be.true;
    expect(name.options.taggable).to.be.true;
    expect(name.options.exportable).to.be.true;
    expect(name.options.fake).to.exist;

    expect(mobile).to.exist;
    expect(mobile).to.be.instanceof(SchemaTypes.String);
    expect(mobile.options).to.exist;
    expect(mobile.options).to.be.an('object');
    expect(mobile.options.type).to.exist;
    expect(mobile.options.trim).to.be.true;
    expect(mobile.options.index).to.be.true;
    expect(mobile.options.searchable).to.be.true;
    expect(mobile.options.taggable).to.be.true;
    expect(mobile.options.exportable).to.be.true;
    expect(mobile.options.fake).to.exist;

    expect(nextOfKinName).to.exist;
    expect(nextOfKinName).to.be.instanceof(SchemaTypes.String);
    expect(nextOfKinName.options).to.exist;
    expect(nextOfKinName.options).to.be.an('object');
    expect(nextOfKinName.options.type).to.exist;
    expect(nextOfKinName.options.trim).to.be.true;
    expect(nextOfKinName.options.index).to.be.true;
    expect(nextOfKinName.options.searchable).to.be.true;
    expect(nextOfKinName.options.taggable).to.be.true;
    expect(nextOfKinName.options.exportable).to.be.true;
    expect(nextOfKinName.options.fake).to.exist;

    expect(nextOfKinMobile).to.exist;
    expect(nextOfKinMobile).to.be.instanceof(SchemaTypes.String);
    expect(nextOfKinMobile.options).to.exist;
    expect(nextOfKinMobile.options).to.be.an('object');
    expect(nextOfKinMobile.options.type).to.exist;
    expect(nextOfKinMobile.options.trim).to.be.true;
    expect(nextOfKinMobile.options.index).to.be.true;
    expect(nextOfKinMobile.options.searchable).to.be.true;
    expect(nextOfKinMobile.options.taggable).to.be.true;
    expect(nextOfKinMobile.options.exportable).to.be.true;
    expect(nextOfKinMobile.options.fake).to.exist;
  });

  it('should have description field', () => {
    const description = Case.path('description');

    expect(description).to.exist;
    expect(description).to.be.instanceof(SchemaTypes.String);
    expect(description.options).to.exist;
    expect(description.options).to.be.an('object');
    expect(description.options.type).to.exist;
    expect(description.options.trim).to.be.true;
    expect(description.options.index).to.be.true;
    expect(description.options.searchable).to.be.true;
    expect(description.options.exportable).to.be.true;
    expect(description.options.fake).to.exist;
  });

  it('should have reportedAt field', () => {
    const reportedAt = Case.path('reportedAt');

    expect(reportedAt).to.exist;
    expect(reportedAt).to.be.instanceof(SchemaTypes.Date);
    expect(reportedAt.options).to.exist;
    expect(reportedAt.options).to.be.an('object');
    expect(reportedAt.options.type).to.exist;
    expect(reportedAt.options.index).to.be.true;
    expect(reportedAt.options.fake).to.exist;
  });

  it('should have reporter field', () => {
    const reporter = Case.path('reporter');

    expect(reporter).to.exist;
    expect(reporter).to.be.instanceof(SchemaTypes.ObjectId);
    expect(reporter.options).to.exist;
    expect(reporter.options).to.be.an('object');
    expect(reporter.options.type).to.exist;
    expect(reporter.options.ref).to.exist;
    expect(reporter.options.ref).to.be.equal(Party.MODEL_NAME);
    expect(reporter.options.index).to.be.true;
    // expect(reporter.options.required).to.be.true;
    expect(reporter.options.exists).to.be.true;
    expect(reporter.options.autopopulate).to.exist;
    expect(reporter.options.taggable).to.exist;
    expect(reporter.options.exportable).to.exist;
    // expect(reporter.options.aggregatable).to.exist;
    expect(reporter.options.default).to.be.undefined;
  });

  it('should have resolvedAt field', () => {
    const resolvedAt = Case.path('resolvedAt');

    expect(resolvedAt).to.exist;
    expect(resolvedAt).to.be.instanceof(SchemaTypes.Date);
    expect(resolvedAt.options).to.exist;
    expect(resolvedAt.options).to.be.an('object');
    expect(resolvedAt.options.type).to.exist;
    expect(resolvedAt.options.index).to.be.true;
    expect(resolvedAt.options.fake).to.exist;
  });

  it('should have resolver field', () => {
    const resolver = Case.path('resolver');

    expect(resolver).to.exist;
    expect(resolver).to.be.instanceof(SchemaTypes.ObjectId);
    expect(resolver.options).to.exist;
    expect(resolver.options).to.be.an('object');
    expect(resolver.options.type).to.exist;
    expect(resolver.options.ref).to.exist;
    expect(resolver.options.ref).to.be.equal(Party.MODEL_NAME);
    expect(resolver.options.index).to.be.true;
    // expect(resolver.options.required).to.be.true;
    expect(resolver.options.exists).to.be.true;
    expect(resolver.options.autopopulate).to.exist;
    expect(resolver.options.taggable).to.exist;
    expect(resolver.options.exportable).to.exist;
    // expect(resolver.options.aggregatable).to.exist;
    expect(resolver.options.default).to.be.undefined;
  });

  it('should have remarks field', () => {
    const remarks = Case.path('remarks');

    expect(remarks).to.exist;
    expect(remarks).to.be.instanceof(SchemaTypes.String);
    expect(remarks.options).to.exist;
    expect(remarks.options).to.be.an('object');
    expect(remarks.options.type).to.exist;
    expect(remarks.options.trim).to.be.true;
    expect(remarks.options.index).to.be.true;
    expect(remarks.options.searchable).to.be.true;
    expect(remarks.options.exportable).to.be.true;
    expect(remarks.options.fake).to.exist;
  });
});
