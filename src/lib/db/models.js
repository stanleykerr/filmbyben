import { DateTime } from "luxon";
import styles from "@styles/CmsForm.module.scss";
import { useField } from "formik";

var DEV_ENV = (process.env.NODE_ENV || "development") === "development";

const HiddenField = () => <></>;

// TODO: refactor with a base field class so we don't have to reimplement logic over and over???

const DefaultField = ({ model, options, ...props }) => {
  let [fieldName] = model;
  const [, meta] = useField({ name: fieldName, ...props });

  const labelText =
    (options.prettyLabels && prettifyText(fieldName)) ?? fieldName;

  return (
    <label>
      <span className={styles.label}>{labelText}</span>
      <div className={styles.inputContainer}>
        <span>{meta.value}</span>
      </div>
    </label>
  );
};

// TODO: somehow not make it so we have to duplicate whole class just to change formatting for a date whether that be through OOP field class or...?
const DateDisplayField = ({ model, options, ...props }) => {
  let [fieldName] = model;
  const [, meta] = useField({ name: fieldName, ...props });

  const labelText =
    (options.prettyLabels && prettifyText(fieldName)) ?? fieldName;

  return (
    <label>
      <span className={styles.label}>{labelText}</span>
      <div className={styles.inputContainer}>
        <span>
          {DateTime.fromSQL(meta.value).toLocaleString(DateTime.DATETIME_MED)}
        </span>
      </div>
    </label>
  );
};

const TextField = ({ model, options, ...props }) => {
  const [fieldName, opts] = model;
  const [field, meta, helpers] = useField({ name: fieldName, ...props });

  const editable = opts.editable ?? true;

  const labelText =
    (options.prettyLabels && prettifyText(fieldName)) ?? fieldName;

  return (
    <>
      <label>
        <span className={styles.label}>{labelText}</span>
        <div className={styles.inputContainer}>
          <input
            {...field}
            {...props}
            readOnly={!editable}
            spellCheck="false"
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
          />
        </div>
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const translationMap = {
  dateDisplay: DateDisplayField,
  hidden: HiddenField,
  string: TextField,
  undefined: DefaultField,
};

/*
 * ======================================================
 * Database models
 * ======================================================
 */

export const Work = {
  id: {
    type: DEV_ENV ? "string" : "hidden",
    editable: false,
  },
  name: {
    type: "string",
    allowNull: false,
  },
  thumbnail: {
    type: "string",
    renderer: function ThumbnailField({ data }) {
      return (
        <span style={{ background: "yellow" }}>
          imagine a file upload here instead of this!
        </span>
      );
    },
  },
  link: "string", // TODO: add a "youtube preview? or an external link e.g. styled like notion page links"
  createdAt: {
    type: "dateDisplay",
    editable: false,
  },
  updatedAt: {
    type: "dateDisplay",
    editable: false,
  },
};

// TODO: use classes and OOP practices for fields?
/* class Field {
  // name
  // type
  // render
} */

function convertField(model, options) {
  let [fieldName, opts] = model;
  /* const hasOptions =
    typeof opts === "object" && !Array.isArray(opts) && opts !== null; */

  let type = opts.type ?? (typeof opts === "string" ? opts : undefined); // TODO: add default type?

  const Renderer =
    opts.renderer ?? translationMap[type] ?? translationMap["undefined"];

  return <Renderer key={fieldName} model={model} options={options} />; // TODO: pass down value from parent?
}

export function convert(model, options) {
  return Object.entries(model).map((m) => convertField(m, options));
}

const prettifyText = (text) => {
  let result = text.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
};
