import '@codetanzania/ewea-internals';

process.env.NODE_ENV = 'test';
process.env.DEFAULT_LOCALE = 'en';
process.env.LOCALES = 'en,sw';
process.env.GEO_BBOX =
  '39.18239593505859,-6.866780089745249,39.280242919921875,-6.76553393902715';
process.env.JWT_SECRET = '978+4fsw6_1n63.hs~ns*ma?4!2#@!4';
process.env.JWT_ALGORITHM = 'HS256';
process.env.JWT_AUDIENCE = 'ewea';
process.env.JWT_ISSUER = 'ewea';
process.env.JWT_SUBJECT = 'ewea';
process.env.JWT_EXPIRES_IN = '7 days';
process.env.JWT_API_TOKEN_EXPIRES_IN = '1000y';
process.env.DEFAULT_TRANSPORT_NAME = 'echo';
process.env.ENABLE_SYNC_TRANSPORT = true;
process.env.NOTIFICATION_CHANNELS = 'EMAIL';
