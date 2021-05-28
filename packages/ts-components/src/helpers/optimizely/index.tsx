import React from 'react';
import { Helmet } from 'react-helmet-async';

export const OptimizelyWeb = () => {
  return (
    <Helmet>
      <script data-testid="custom-script">
        {`
        (function() {
          function onPageDeactivated(event) {
            if (window && window.utag_data && window.utag_data.experiment_data && window.utag_data.experiment_data.length > 0) {
              window.utag_data.experiment_data = [];
            }
          }
            window.optimizely_feature_flag = true;

            window["optimizely_cdn"] = "https://cdn.optimizely.com/public/15853140465/s/tnl_custom_snippet.js";
            window['optimizely'] = window['optimizely'] || [];
            if (document.cookie.indexOf('nuk-consent-personalisation=1') === -1) {
              window['optimizely'].push({
                type: 'disable',
              });
            } else {
              window["optimizely"].push({
                type: "addListener",
                filter: {
                  type: "lifecycle",
                  name: "pageDeactivated"
                },
                handler: onPageDeactivated
              });
            }
        })();
      `}
      </script>
      <script
        data-testid="optimizely-script"
        src="https://cdn.optimizely.com/public/15853140465/s/tnl_custom_snippet.js"
      />
    </Helmet>
  );
};
