import { articleComments as articleCommentsQuery } from "@times-components/provider-queries";

export default ({
  error = () => {},
  enabled = true,
  count = 123,
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
          })
        }
      },
      error: error(),
      query: articleCommentsQuery,
      variables: queryVariables
    }
  ];
};
