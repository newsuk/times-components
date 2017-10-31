/**
 * This is the shared configuration across all environments
 */

const config = (platform) => ({
    "preset": "react-native",
    "haste": {
        "defaultPlatform": platform,
        "platforms": [
            platform
        ],
        "providesModuleNodeModules": [
            "react",
            "react-native"
        ]
    },
    "rootDir": "../../../../",
    "transformIgnorePatterns": ["node_modules/(?!@times-components)/"],
    "testMatch": [
        `<rootDir>/packages/article/__tests__/${platform}/article.(${platform}).test.js`
    ],
    "moduleFileExtensions": ["js", `${platform}.js`]
});

module.exports = config;