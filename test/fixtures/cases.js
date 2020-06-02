const cases = [
  {
    _id: '5eb20aaadcf2bd6aae15b4d0',
    number: '2020-O5-0001-TZ',
    victim: {
      referral: '85623679',
      pcr: '95623679',
      name: 'Jane Mode',
      mobile: '255714117841',
      age: 30,
      weight: 51,
      address: 'Tandale',
      nextOfKin: { name: 'Asha Mdoe', mobile: '255714104893' },
    },
    description: 'Severe injury from Floods.',
    reportedAt: '2020-05-04T02:48:48.323Z',
    createdAt: '2020-05-04T02:48:48.323Z',
    resolvedAt: '2020-05-04T02:59:48.323Z',
    remarks: 'Handled.',
    populate: {
      reporter: {
        match: { name: 'Ali Mdoe' },
        model: 'Party',
      },
      resolver: {
        match: { name: 'Ali Mdoe' },
        model: 'Party',
      },
      'victim.gender': {
        match: { namespace: 'PartyGender', 'strings.name.en': 'Female' },
        model: 'Predefine',
      },
      'victim.occupation': {
        match: {
          namespace: 'PartyGender',
          'strings.name.en': 'Health Care Worker',
        },
        model: 'Predefine',
      },
      'victiom.area': {
        match: { namespace: 'AdministrativeArea', 'strings.name.en': 'Ilala' },
        model: 'Predefine',
      },
    },
  },
];

export default cases;
