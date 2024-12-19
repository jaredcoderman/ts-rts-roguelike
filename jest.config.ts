import type { Config } from 'jest'

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom', // Use 'jsdom' for browser-specific testing
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    testMatch: [
        '**/__tests__/**/*.(ts|tsx|js)',
        '**/?(*.)+(spec|test).(ts|tsx|js)',
    ],
    collectCoverage: true,
    coverageDirectory: 'coverage',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Add this line for the setup file
}

export default config
