import { ReactNode, useState } from "react";

import {
  Card,
  Grid,
  Spacer,
  Table,
  Description,
  Button,
  Tag,
} from "@geist-ui/core";
import { TableColumnRender } from "@geist-ui/core/esm/table/table-types";
import { DateTime } from "luxon";
import styled from "styled-components";
import { deserialize, serialize } from "superjson";

import Head from "next/head";

import CmsLayout from "@/components/cms/CmsLayout";
import { Work } from "@/lib/db";

import type { NextPageWithLayout } from "@/types";
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  InferGetServerSidePropsType,
} from "next";

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`;

// const Text = styled.span``;

type PageParams = {};

type PageProps = {
  works: any;
};

type CmsWork = {
  id: ReactNode;
  name: string;
  link: string;
  visibility: ReactNode;
  age: string;
  records: Array<{ date: string }>;
  operation?: any;
};

const CMS: NextPageWithLayout<PageProps> = ({
  works: _works,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const works: Array<CmsWork> = (deserialize(_works) as Work[]).map(
    ({ id, name, thumbnail, private: priv, createdAt }) => ({
      id: <Tag type="lite">{id}</Tag>,
      name,
      link: thumbnail,
      visibility: priv ? (
        <Tag type="secondary">private</Tag>
      ) : (
        <Tag type="success">public</Tag>
      ),
      age: DateTime.now()
        .diff(DateTime.fromJSDate(createdAt))
        .shiftTo("years", "days")
        .normalize()
        .toHuman({ listStyle: "narrow", unitDisplay: "narrow" }),
      records: [],
    })
  );

  const [data, setData] = useState(works);

  /* const renderAction: TableColumnRender<TableDataItemBase> = (
    value,
    rowData,
    index
  ) => {
    const removeHandler = () => {
      console.log("value:", value, "rowData:", rowData, "index:", index);
      setData((last) => last.filter((_, dataIndex) => dataIndex !== index));
    };
    return (
      <Button
        type="error"
        auto
        scale={1 / 3}
        font="12px"
        onClick={removeHandler}
      >
        Remove
      </Button>
    );
  }; */

  const renderAction: TableColumnRender<CmsWork> = (
    value,
    rowData,
    rowIndex
  ) => {
    const updateHandler = () => {
      setData((last) => {
        return last.map((item, dataIndex) => {
          if (dataIndex !== rowIndex) return item;
          return {
            ...item,
            property: Math.random().toString(16).slice(-5),
          };
        });
      });
    };
    return (
      <Button
        type="secondary"
        auto
        scale={1 / 3}
        font="12px"
        onClick={updateHandler}
      >
        Update
      </Button>
    );
  };

  return (
    <>
      <div>
        <Grid.Container gap={2} justify="center">
          <Grid xs={24}>
            <Card shadow width="100%" height="50px" />
          </Grid>
          <Grid xs={12}>
            <Card shadow width="100%" height="50px" />
          </Grid>
          <Grid xs={12}>
            <Card shadow width="100%" height="50px" />
          </Grid>
          <Grid xs={6}>
            <Card shadow width="100%" height="50px" />
          </Grid>
          <Grid xs={6}>
            <Card shadow width="100%" height="50px" />
          </Grid>
          <Grid xs={6}>
            <Card shadow width="100%" height="50px" />
          </Grid>
          <Grid xs={6}>
            <Card shadow width="100%" height="50px" />
          </Grid>
          <Grid xs={6}>
            <Card shadow width="100%" height="50px" />
          </Grid>
          <Grid xs={12}>
            <Card shadow width="100%" height="50px" />
          </Grid>
          <Grid xs={6}>
            <Card shadow width="100%" height="50px" />
          </Grid>
        </Grid.Container>

        <Head>
          <title>CMS &#45; Overview</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Title>test</Title>
        <Spacer />
        <Description title="Section Title" content="Data about this section." />
        <Spacer />
        <Grid.Container gap={2} justify="center">
          {/* works.flatMap((work, i) => [
          <CmsWork key={work.id} work={work} />,
          <Spacer key={i} />,
        ]) */}

          {works?.length !== 0 ? (
            <Table<CmsWork> data={data} onChange={(value) => setData(value)}>
              <Table.Column<CmsWork> prop="id" label="id" />
              <Table.Column<CmsWork> prop="name" label="name" />
              <Table.Column<CmsWork> prop="link" label="link" />
              <Table.Column<CmsWork> prop="visibility" label="visibility" />
              <Table.Column<CmsWork>
                prop="operation"
                label="operation"
                width={150}
                render={renderAction}
              />
            </Table>
          ) : (
            <>no works found</>
          )}
        </Grid.Container>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<
  PageProps,
  PageParams
> = async ({}: GetServerSidePropsContext<PageParams>): Promise<
  GetServerSidePropsResult<PageProps>
> => {
  /* const handler = nextConnect();
  handler.use(auth);

  try {
    await handler.run(req, res);
  } catch (e) {
    // handle the error
    console.error(e);
  }

  const user = req.user;
  console.log("user:", user); */

  const data = await Work.findAll();

  if (!data || data.length === 0) {
    return {
      props: {
        works: [],
      },
    };
  }

  const works = serialize(data.map((work) => work.get({ plain: true })));
  return {
    props: { works }, // will be passed to the page component as props
  };
};

CMS.getLayout = (page) => <CmsLayout>{page}</CmsLayout>;

export default CMS;
