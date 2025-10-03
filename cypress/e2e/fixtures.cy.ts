describe('Fixture Data Tests', () => {
  it('should load adaptere fixture data', () => {
    cy.fixture('adaptere').then((data) => {
      expect(data).to.be.an('array');
      expect(data).to.have.length.greaterThan(0);
      expect(data[0]).to.have.property('fintlabs_no');
      expect(data[0].fintlabs_no).to.have.property('personvern');
    });
  });

  it('should load hendelser fixture data', () => {
    cy.fixture('hendelser').then((data) => {
      expect(data).to.be.an('array');
      expect(data).to.have.length.greaterThan(0);
      expect(data[0]).to.have.property('hendelseId');
      expect(data[0]).to.have.property('operasjon');
      expect(data[0]).to.have.property('organisasjon');
    });
  });

  it('should load adapter component modal fixture data', () => {
    cy.fixture('adapter-component-modal').then((data) => {
      expect(data).to.have.property('adapterId');
      expect(data).to.have.property('username');
      expect(data).to.have.property('orgId');
      expect(data).to.have.property('capabilities');
      expect(data.capabilities).to.be.an('array');
    });
  });

  it('should load hendelse detail fixture data', () => {
    cy.fixture('hendelse-detail').then((data) => {
      expect(data).to.have.property('request');
      expect(data).to.have.property('response');
      expect(data.request).to.have.property('corrId');
      expect(data.response).to.have.property('corrId');
    });
  });
});
