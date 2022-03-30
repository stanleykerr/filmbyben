import { Input, Link, Switch, Text } from "@geist-ui/core";

import { DateTime } from "luxon";
import { Dot } from "@geist-ui/core";
import Image from "next/image";
import styles from "@styles/CmsForm.module.scss";
import { useField } from "formik";

var DEV_ENV = false; //(process.env.NODE_ENV || "development") === "development";

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
          {(meta.value instanceof Date
            ? DateTime.fromJSDate
            : DateTime.fromSQL)(meta.value).toLocaleString(
            DateTime.DATETIME_MED
          )}
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

  // should we use readOnly or disabled for non-editable fields?
  return (
    <>
      <label>
        <div className={styles.inputContainer}>
          <Input
            {...field}
            {...props}
            disabled={!editable}
            spellCheck="false"
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            width="100%"
            label={labelText}
          />
          {/* <input
            {...field}
            {...props}
            readOnly={!editable}
            spellCheck="false"
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
          /> */}
        </div>
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const ToggleField = ({ model, options, ...props }) => {
  const [fieldName, opts] = model;
  const [field, meta, helpers] = useField({ name: fieldName, ...props });

  // TODO: disabled={!editable} ??
  const editable = opts.editable ?? true;

  const labelText =
    (options.prettyLabels && prettifyText(fieldName)) ?? fieldName;

  return (
    <>
      {/* TODO: use: <Description title="Section Title" content={<p><Code>code</Code> about this section.</p>} /> */}
      <label>
        <span className={styles.label}>{labelText}</span>
        <div className={styles.inputContainer}>
          <Switch {...field} {...props} initialChecked={field.value} />
          {/* <input
            {...field}
            {...props}
            readOnly={!editable}
            spellCheck="false"
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
          /> */}
        </div>
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const YoutubeThumbnailField = ({ model, options, ...props }) => {
  const [fieldName, opts] = model;
  const [field, meta, helpers] = useField({ name: fieldName, ...props });

  // TODO: disabled={!editable} ??
  const editable = opts.editable ?? true;

  const labelText =
    (options.prettyLabels && prettifyText(fieldName)) ?? fieldName;

  // return "https://img.youtube.com/vi/"+this.id+"/default.jpg";

  const generateThumbnail = (url, quality = "sd") => {
    // console.log(url);
    var regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    var id = match && match[7].length == 11 ? match[7] : false;

    let qualityMap = {
      thumb: {
        width: 120,
        height: 90,
        qid: "",
      },
      mq: {
        width: 320,
        height: 180,
        qid: "mq",
      },
      hq: {
        width: 480,
        height: 360,
        qid: "hq",
      },
      sd: {
        width: 640,
        height: 480,
        qid: "sd",
      },
      max: {
        width: 1280,
        height: 720,
        qid: "maxres",
      },
    };

    let { width, height, qid } = qualityMap[quality];

    return {
      width,
      height,
      src: `https://img.youtube.com/vi/${id}/${qid}default.jpg`,
    };
  };

  return (
    <>
      {/* TODO: use: <Description title="Section Title" content={<p><Code>code</Code> about this section.</p>} /> */}
      <label>
        <span className={styles.label}>{labelText}</span>
        <div className={styles.inputContainer}>
          <Image {...generateThumbnail(field.value, "mq")} />
          {/* <input
            {...field}
            {...props}
            readOnly={!editable}
            spellCheck="false"
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
          /> */}
        </div>
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const LinkDisplayField = ({ model, options, ...props }) => {
  const [fieldName] = model;
  const [field, meta, helpers] = useField({ name: fieldName, ...props });

  const labelText =
    (options.prettyLabels && prettifyText(fieldName)) ?? fieldName;

  return (
    <>
      <label>
        <span className={styles.label}>{labelText}</span>
        <div className={styles.inputContainer}>
          <Link href={field.value} block icon color="primary">
            {field.value}
          </Link>
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
  hidden: null,
  link: LinkDisplayField,
  string: TextField,
  raw: DefaultField,
  toggle: ToggleField,
  undefined: DefaultField,
};

/*
 * ======================================================
 * Database models
 * ======================================================
 */

export const Work = {
  display: {
    type: "hidden",
    viewOnlyRenderer: function TitleFieldRenderer({
      model,
      options,
      ...props
    }) {
      // console.log(model, options, "other:", props);
      let [fieldName] = model;
      const [field, meta] = useField({ name: fieldName, ...props });

      const {
        value: { name, visible },
      } = field;

      return (
        <>
          <Dot type={visible ? "success" : "default"} />
          <Text
            h5
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {name}
          </Text>
        </>
      );
    },
  },
  id: {
    type: DEV_ENV ? "string" : "hidden",
    editable: false,
    viewOnlyType: DEV_ENV ? "raw" : "hidden",
  },
  name: {
    type: "string",
    allowNull: false,
    viewOnlyType: "hidden",
  },
  thumbnail: {
    type: "hidden",
    /* renderer: function ThumbnailField({ data }) {
      return (
        <span style={{ background: "yellow" }}>
          imagine a file upload here instead of this!
        </span>
      );
    }, */
    viewOnlyRenderer: YoutubeThumbnailField,
  },
  link: {
    type: "string",
    viewOnlyType: "link",
  }, // TODO: add a "youtube preview? or an external link e.g. styled like notion page links"
  visible: {
    type: "toggle",
    viewOnlyType: "hidden",
  },
  createdAt: {
    type: "dateDisplay",
    viewOnlyType: "hidden",
    editable: false,
  },
  updatedAt: {
    type: "dateDisplay",
    viewOnlyType: "hidden",
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

  let { viewOnly } = options;

  let type = opts.type ?? (typeof opts === "string" ? opts : undefined); // TODO: add default type?

  let Renderer =
    opts.renderer ?? translationMap[type] ?? translationMap["undefined"];

  if (viewOnly) {
    let viewOnlyType =
      opts.viewOnlyType ?? (typeof opts === "string" ? opts : undefined); // TODO: add default type?

    Renderer =
      opts.viewOnlyRenderer ?? translationMap[viewOnlyType ?? type] ?? Renderer; // use default renderer as fallback if no viewOnlyRenderer specified

    if (viewOnlyType === "hidden") return null;
  } else if (type === "hidden") return null;

  return (
    Renderer && <Renderer key={fieldName} model={model} options={options} />
  ); // TODO: pass down value from parent?
}

export function convert(model, options) {
  // model = deserialize(model);
  return Object.entries(model).map((m) => convertField(m, options));
}

const prettifyText = (text) => {
  let result = text.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
};
