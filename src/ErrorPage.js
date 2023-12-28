import {NonIdealState} from "@blueprintjs/core";

export function ErrorPage({error}) {
    return (
      <NonIdealState
          icon="error"
          title="No countries found"
          description={error.message}
      />
    );
}