#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/567143b87cd494784d9b59d506f6cd635ac8dd24f76258194b5b5725f9c80cc1/contract';
import endContract from '../../snapshots/567143b87cd494784d9b59d506f6cd635ac8dd24f76258194b5b5725f9c80cc1/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/b80dd10b82474bb5fe55164e4d62d1b22c962f1b5c04396c5e55f977219fc469/contract';
import startContract from '../../snapshots/b80dd10b82474bb5fe55164e4d62d1b22c962f1b5c04396c5e55f977219fc469/contract.json' with { type: 'json' };
import { Migration, MigrationCLI } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addPrimaryKey({
        schema: 'public',
        table: 'items',
        constraint: 'items_pkey',
        columns: ['id'],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
