export default {
    displayName: {
        name: 'nestjs',
        color: 'magentaBright',
    },
    "moduleFileExtensions": [
        "js",
        "json",
        "ts"
    ],
    "rootDir": "src",
    "testRegex": ".*\\.spec\\.ts$",
    transform: {
        '^.+\\.(t|j)s$': '@swc/jest',
    },
    "collectCoverageFrom": [
        "**/*.(t|j)s"
    ],
    "coverageDirectory": "../coverage",
    "testEnvironment": "node",
    moduleNameMapper: {
        '@ms/calc\\-app/(.*)$': '<rootDir>/../../../node_modules/@ms/calc-app/dist/$1',
    }
}