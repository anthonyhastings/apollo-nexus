import { scalarType } from 'nexus';
import { Kind } from 'graphql';
import { DateTime } from 'luxon';

export const ISODateString = scalarType({
  name: 'ISODateString',
  description: 'A date-time string such as 2007-12-03T10:15:30Z in UTC.',
  asNexusMethod: 'ISODateString',
  parseValue(value) {
    if (typeof value !== 'string') {
      throw new TypeError('ISODateString cannot represent non string type.');
    }

    const dateTimeInstance = DateTime.fromISO(value);

    if (!dateTimeInstance.isValid) {
      throw new TypeError(
        'DateTime cannot represent an invalid date-time-string.'
      );
    }

    return dateTimeInstance;
  },
  serialize(value) {
    if (typeof value !== 'string') {
      throw new TypeError('ISODateString cannot represent non string type.');
    }

    const dateTimeInstance = DateTime.fromISO(value);

    if (!dateTimeInstance.isValid) {
      throw new TypeError(
        'DateTime cannot represent an invalid date-time-string.'
      );
    }

    return dateTimeInstance.toUTC().toISO();
  },
  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new TypeError('ISODateString cannot represent non string type.');
    }

    const dateTimeInstance = DateTime.fromISO(ast.value);

    if (!dateTimeInstance.isValid) {
      throw new TypeError(
        'DateTime cannot represent an invalid date-time-string.'
      );
    }

    return dateTimeInstance;
  },
});
