export const getDeckApiUrl = (): string => {
    if (typeof window !== 'undefined') {
        const environmentName = window.__TIMES_CONFIG__ && window.__TIMES_CONFIG__.environmentName;

        if (environmentName === 'prod') {
            return 'https://editorial-tm.newsapis.co.uk/prod/deck-component-data-api';
        } else {
            return 'https://editorial-tm.staging.newsapis.co.uk/staging/deck-component-data-api';
        }
    } else {
        return 'https://editorial-tm.staging.newsapis.co.uk/staging/deck-component-data-api';
    }
};
