import { Form, Formik } from "formik";
import { Work, convert } from "@lib/db/models";

import { Spacer } from "@geist-ui/react";

export default function CmsWork({ work }) {
  // we use a flat map to add a spacer at the end of each form field
  let generatedFields = convert(Work, { prettyLabels: true }).flatMap(
    (f, i) => [f, <Spacer key={i} />]
  );

  return (
    <Formik
      initialValues={work}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {({ isSubmitting }) => (
        <Form
          style={{
            background: "rgba(0, 0, 0, 0.05)",
            paddingBottom: 15,
            marginBottom: 15,
          }}
        >
          {generatedFields}
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}
