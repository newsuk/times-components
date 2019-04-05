import { articleComments as articleCommentsQuery } from "@times-components/provider-queries";

export default ({
  count = 123,
  enabled = true,
  error = () => {},
  id,
  variables = () => {}
}) => {
  const queryVariables = variables();

  return [
    {
      defaults: {
        types: {
          Article: () => ({
            commentCount: count,
            commentsEnabled: enabled,
            id
          }),
          UUID: () => "a-u-u-i-d"
        }
      },
      error: error(),
      query: articleCommentsQuery,
      variables: queryVariables
    }
  ];
};
