/**
 * This is the shared configuration across all environments
 */

module.exports = {
    "preset": "react-native",
    "rootDir": "../../",
    "transformIgnorePatterns": ["node_modules/(?!@times-components)/"],
    "projects": [ "__tests__/android", "__tests__/ios" ]    
};
