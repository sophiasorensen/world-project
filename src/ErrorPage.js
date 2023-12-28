import {NonIdealState} from "@blueprintjs/core";

const errorDefault = { message: "Unexpected error occurred" }

export default function ErrorPage({error = errorDefault}) {
    return (
      <NonIdealState
          icon="error"
          title="No countries found"
          description={error.message}
      />
    );
}