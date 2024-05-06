import type * as jest from 'jest';
const config: jest.Config = {
  moduleNameMapper: {
    'src/(.*)': '<rootDir>/src/$1',
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '../',
  testEnvironment: 'node',
  testRegex: '.e2e-spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
};
export default config;
