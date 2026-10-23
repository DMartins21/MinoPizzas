import 'temporal-polyfill/global'
import postgres from '@prisma/orm-postgres/runtime';
import type { Contract } from '../../contract';
// import contractJson from '../../contract.json' with { type: 'json' };

const contractJson = require('../../contract.json');

export const db = postgres<Contract>({
  contract: contractJson,
  url: process.env['DATABASE_URL']!,
});