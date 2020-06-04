import {
  clear as clearHttp,
  testRouter,
} from '@lykmapipo/express-test-helpers';
import {
  create,
  clear as clearDb,
  expect,
} from '@lykmapipo/mongoose-test-helpers';
import { Predefine } from '@lykmapipo/predefine';
import { createModels } from '@lykmapipo/file';
import { seedCommons, seedDefaults } from '@codetanzania/ewea-common';
import { Party } from '@codetanzania/emis-stakeholder';
import { Case, caseRouter } from '../../src';

describe('Case Rest API', () => {
  const area = Predefine.fakeAdministrativeArea();
  const reporter = Party.fake();

  const caze = Case.fakeExcept('number');
  caze.set({ reporter });

  const options = {
    pathSingle: '/cases/:id',
    pathList: '/cases',
    pathSchema: '/cases/schema/',
    pathExport: '/cases/export/',
  };

  before((done) => clearDb(Case, done));

  before(() => clearHttp());

  beforeEach(() => createModels());

  before((done) => seedDefaults(done));
  before((done) => seedCommons(done));
  before((done) => create(area, done));
  before((done) => create(reporter, done));

  it('should handle HTTP POST on /cases', (done) => {
    const { testPost } = testRouter(options, caseRouter);
    testPost({ ...caze.toObject() })
      .expect(201)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        const created = new Case(body);
        expect(created._id).to.exist.and.be.eql(caze._id);
        expect(created.number).to.exist;
        done(error, body);
      });
  });

  it('should handle HTTP GET on /cases', (done) => {
    const { testGet } = testRouter(options, caseRouter);
    testGet()
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        expect(body.data).to.exist;
        expect(body.total).to.exist;
        expect(body.limit).to.exist;
        expect(body.skip).to.exist;
        expect(body.page).to.exist;
        expect(body.pages).to.exist;
        expect(body.lastModified).to.exist;
        done(error, body);
      });
  });

  it('should handle GET /cases/schema', (done) => {
    const { testGetSchema } = testRouter(options, caseRouter);
    testGetSchema().expect(200, done);
  });

  it('should handle GET /cases/export', (done) => {
    const { testGetExport } = testRouter(options, caseRouter);
    testGetExport()
      .expect('Content-Type', 'text/csv; charset=utf-8')
      .expect(({ headers }) => {
        expect(headers['content-disposition']).to.exist;
      })
      .expect(200, done);
  });

  it('should handle HTTP GET on /cases/:id', (done) => {
    const { testGet } = testRouter(options, caseRouter);
    const params = { id: caze._id.toString() };
    testGet(params)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        const found = new Case(body);
        expect(found._id).to.exist.and.be.eql(caze._id);
        expect(found.number).to.exist;
        done(error, body);
      });
  });

  it('should handle HTTP PATCH on /cases/:id', (done) => {
    const { testPatch } = testRouter(options, caseRouter);
    const { description, remarks } = caze.fakeOnly('description', 'remarks');
    const params = { id: caze._id.toString() };
    testPatch(params, { description, remarks })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        const patched = new Case(body);
        expect(patched._id).to.exist.and.be.eql(caze._id);
        expect(patched.number).to.exist;
        expect(patched.description).to.exist.and.be.eql(description);
        done(error, body);
      });
  });

  it('should handle HTTP PUT on /cases/:id', (done) => {
    const { testPut } = testRouter(options, caseRouter);
    const { description, interventions } = caze.fakeOnly(
      'description',
      'interventions'
    );
    const params = { id: caze._id.toString() };
    testPut(params, { description, interventions })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        const patched = new Case(body);
        expect(patched._id).to.exist.and.be.eql(caze._id);
        expect(patched.number).to.exist;
        expect(patched.description).to.exist.and.be.eql(description);
        done(error, body);
      });
  });

  it('should handle HTTP DELETE on /cases/:id', (done) => {
    const { testDelete } = testRouter(options, caseRouter);
    const params = { id: caze._id.toString() };
    testDelete(params)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        const patched = new Case(body);
        expect(patched._id).to.exist.and.be.eql(caze._id);
        expect(patched.number).to.exist;
        expect(patched.deletedAt).to.exist;
        done(error, body);
      });
  });

  after(() => clearHttp());

  after((done) => clearDb(Case, done));
});
