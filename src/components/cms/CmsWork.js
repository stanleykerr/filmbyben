import {} from "@geist-ui/react-icons";

import { Button, Card, Grid, Spacer } from "@geist-ui/react";
import { Edit, XSquare } from "@geist-ui/react-icons";
import { Form, Formik } from "formik";
import { Work, convert } from "@lib/db/models";

import { deserialize } from "superjson";
import { useState } from "react";

export default function CmsWork({ work }) {
  work = deserialize(work);

  let [isEditing, setEditing] = useState(false);

  // we use a flat map to add a spacer at the end of each form field
  let generatedFields = convert(Work, {
    prettyLabels: true,
    viewOnly: !isEditing,
  })
    .filter((f) => f !== null)
    .flatMap((f, i) => [f, <Spacer key={i} />]);

  return (
    <Card shadow width="100%">
      <Formik
        initialValues={work}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {({ isSubmitting, submitForm }) => (
          <Form>
            {generatedFields}
            {isEditing ? (
              <Grid.Container gap={1} justify="center">
                <Grid xs={12}>
                  <Button
                    width="100%"
                    scale={0.85}
                    type="secondary"
                    disabled={isSubmitting}
                    loading={isSubmitting}
                    onClick={() => {
                      setEditing(!isEditing);
                      submitForm();
                    }}
                  >
                    Save
                  </Button>
                </Grid>
                <Grid xs={12}>
                  <Button
                    width="100%"
                    scale={0.85}
                    disabled={isSubmitting}
                    loading={isSubmitting}
                    onClick={() => {
                      setEditing(!isEditing);
                      submitForm();
                    }}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid.Container>
            ) : (
              <Button
                width="100%"
                icon={<Edit />}
                disabled={isSubmitting}
                loading={isSubmitting}
                onClick={() => setEditing(!isEditing)}
              >
                Edit
              </Button>
            )}
          </Form>
        )}
      </Formik>
    </Card>
  );
}
