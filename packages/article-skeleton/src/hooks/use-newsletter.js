import { useEffect, useReducer, useCallback } from "react";

const initialState = {
  alreadySubscribed: undefined,
  isSubscribed: undefined,
  loading: true,
  subscribing: false
};

function reducer(state, action) {
  switch (action.type) {
    case "NEWSLETTER_LOADED": {
      const { isSubscribed } = action.payload;
      return {
        ...state,
        loading: false,
        isSubscribed,
        alreadySubscribed: isSubscribed
      };
    }

    case "SUBSCRIBE_NEWSLETTER_STARTED": {
      return {
        ...state,
        subscribing: true
      };
    }

    case "SUBSCRIBE_NEWSLETTER_FINISHED": {
      const { isSubscribed } = action.payload;
      return {
        ...state,
        isSubscribed,
        subscribing: false
      };
    }
  }
}

export function useNewsletter(newsletterId) {
  const [
    { alreadySubscribed, isSubscribed, loading, subscribing },
    dispatch
  ] = useReducer(reducer, initialState);

  const makeRequest = useCallback(async query => {
    const response = await fetch("http://0.0.0.0:4000/graphql", {
      method: "POST",
      headers: {
        "authorizer.userid": "3BOK086790280",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ query, variables: { id: newsletterId } })
    });

    const { data } = await response.json();

    return data;
  }, []);

  useEffect(() => {
    makeRequest(
      "query NewsletterPuff($id: String!) { newsletter(id: $id) { isSubscribed } }"
    ).then(({ newsletter }) => {
      dispatch({
        type: "NEWSLETTER_LOADED",
        payload: {
          isSubscribed: newsletter.isSubscribed
        }
      });
    });
  }, []);

  const subscribeNewsletter = useCallback(async () => {
    dispatch({ type: "SUBSCRIBE_NEWSLETTER_STARTED" });
    const { subscribeNewsletter } = await makeRequest(
      "mutation NewsletterPuffSubscribeNewsletter($id: String!) { subscribeNewsletter(id: $id) { id isSubscribed } }"
    );
    dispatch({
      type: "SUBSCRIBE_NEWSLETTER_FINISHED",
      payload: {
        isSubscribed: subscribeNewsletter.isSubscribed
      }
    });
  });

  return {
    alreadySubscribed,
    isSubscribed,
    loading,
    subscribeNewsletter,
    subscribing
  };
}
