import forge from 'node-forge';

export function generateCertificate() {
  const pki = forge.pki;

  // generate a keypair and create an X.509v3 certificate
  const keys = pki.rsa.generateKeyPair(2048);
  const cert = pki.createCertificate();
  cert.publicKey = keys.publicKey;
  // alternatively set public key from a csr
  // cert.publicKey = csr.publicKey;
  // NOTE: serialNumber is the hex encoded value of an ASN.1 INTEGER.
  // Conforming CAs should ensure serialNumber is:
  // - no more than 20 octets
  // - non-negative (prefix a '00' if your value starts with a '1' bit)
  cert.serialNumber = '01';
  cert.validity.notBefore = new Date();
  cert.validity.notAfter = new Date();
  cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 1);
  const attrs = [
    {
      name: 'commonName',
      value: 'icnetworking.ru',
    },
    {
      name: 'countryName',
      value: 'RU',
    },
    {
      name: 'organizationName',
      value: 'icnetworking',
    },
  ];
  cert.setSubject(attrs);
  // alternatively set subject from a csr
  // cert.setSubject(csr.subject.attributes);
  cert.setIssuer(attrs);
  cert.setExtensions([
    {
      name: 'basicConstraints',
      cA: true,
    },
    {
      name: 'keyUsage',
      keyCertSign: true,
      digitalSignature: true,
      nonRepudiation: true,
      keyEncipherment: true,
      dataEncipherment: true,
    },
    {
      name: 'extKeyUsage',
      serverAuth: true,
      clientAuth: true,
      codeSigning: true,
      emailProtection: true,
      timeStamping: true,
    },
    {
      name: 'nsCertType',
      client: true,
      server: true,
      email: true,
      objsign: true,
      sslCA: true,
      emailCA: true,
      objCA: true,
    },
    {
      name: 'subjectAltName',
      altNames: [
        {
          type: 6, // URI
          value: 'https://icnetworking.ru',
        },
        {
          type: 7, // IP
          ip: '127.0.0.1',
        },
      ],
    },
    {
      name: 'subjectKeyIdentifier',
    },
  ]);
  /* alternatively set extensions from a csr
var extensions = csr.getAttribute({name: 'extensionRequest'}).extensions;
// optionally add more extensions
extensions.push.apply(extensions, [{
  name: 'basicConstraints',
  cA: true
}, {
  name: 'keyUsage',
  keyCertSign: true,
  digitalSignature: true,
  nonRepudiation: true,
  keyEncipherment: true,
  dataEncipherment: true
}]);
cert.setExtensions(extensions);
*/
  // self-sign certificate
  cert.sign(keys.privateKey);

  const privateKey = pki.privateKeyToPem(keys.privateKey);
  const certPEM = pki.certificateToPem(cert);

  // // creates a CA store
  // const caStore = pki.createCaStore([certPEM]);
  //
  // // add a certificate to the CA store
  // caStore.addCertificate(cert);

  return {
    privateKey,
    certPEM,
  };
}
