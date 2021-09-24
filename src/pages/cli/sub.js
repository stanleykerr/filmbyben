import CliLayout from "@components/cli/CliLayout";

export default function Sub() {
  return <>test</>;
}

// TODO: fix
// eslint-disable-next-line react/display-name
Sub.getLayout = (page) => <CliLayout>{page}</CliLayout>;
