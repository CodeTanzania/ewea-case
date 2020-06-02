import { expect } from '@lykmapipo/mongoose-test-helpers';
import { ensureReporter, ensureResolver } from '../../src/http.middlewares';

describe('Http Middlewares', () => {
  it('should ensure reporter if not set', (done) => {
    const request = { body: {}, party: {} };
    ensureReporter(request, {}, () => {
      expect(request.body.reporter).to.exist;
      expect(request.body.reporter).to.be.eql(request.party);
      done();
    });
  });

  it('should ignore reporter if set', (done) => {
    const request = { body: { reporter: {} }, party: {} };
    ensureReporter(request, {}, () => {
      expect(request.body.reporter).to.exist;
      expect(request.body.reporter).to.be.eql(request.body.reporter);
      done();
    });
  });

  it('should ensure resolver if not set', (done) => {
    const request = { body: { resolvedAt: new Date() }, party: {} };
    ensureResolver(request, {}, () => {
      expect(request.body.resolver).to.exist;
      expect(request.body.resolver).to.be.eql(request.party);
      expect(request.body.resolvedAt).to.exist;
      done();
    });
  });

  it('should ignore resolver if set', (done) => {
    const request = { body: { resolver: {} }, party: {} };
    ensureResolver(request, {}, () => {
      expect(request.body.resolver).to.exist;
      expect(request.body.resolver).to.be.eql(request.body.resolver);
      expect(request.body.resolvedAt).to.exist;
      done();
    });
  });
});
