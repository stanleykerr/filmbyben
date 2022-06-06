import Head from "next/head";

import { Card, Grid, Spacer } from "@geist-ui/core";
import { Description } from "@geist-ui/core";
import { Work } from "@/lib/sequelize";
import styled from "styled-components";
import { deserialize, serialize } from "superjson";

import CmsLayout from "@/components/cms/CmsLayout";
import CmsWork from "@/components/cms/CmsWork";

import styles from "@/styles/CMS.module.scss";

// import { Card as LegacyCard } from "@nextui-org/react";

// import type { GetStaticProps, InferGetStaticPropsType } from 'next';

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`;

const Text = styled.span``;

export default function CMS({ works }) {
  works = deserialize(works);

  return (
    <>
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

      <div className={styles.container}>
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
          {works?.length ? (
            works.map((work) => (
              <Grid key={work.id} /* xs={12} md={6}  */ /* lg={4} */ xs={8}>
                <CmsWork /* key={`cmswork_${work.id}`} */ work={work} />
              </Grid>
            ))
          ) : (
            <>no works found</>
          )}
        </Grid.Container>
      </div>
    </>
  );
}

export async function getServerSideProps(_context) {
  let works = await Work.findAll();

  works = serialize(works.map((work) => work.get({ plain: true })));

  return {
    props: { works }, // will be passed to the page component as props
  };
}

// TODO: fix
// eslint-disable-next-line react/display-name
CMS.getLayout = (page) => <CmsLayout>{page}</CmsLayout>;
