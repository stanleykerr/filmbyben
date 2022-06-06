import { useState } from "react";

import {
  Card,
  Grid,
  Loading,
  Spacer,
  Text,
  useScale,
  useTheme,
  withScale,
} from "@geist-ui/core";
import { File, Youtube } from "@geist-ui/icons";
import { DateTime } from "luxon";
import styled from "styled-components";

import { Work, convert } from "@/lib/db/models";


// import styles from "@/styles/CMS.module.scss";

// import { Card } from "@nextui-org/react";

// import { Edit, XSquare } from "@geist-ui/react-icons"; // TODO: use new import

// import { Card as LegacyCard } from "@nextui-org/react";

// import type { GetStaticProps, InferGetStaticPropsType } from 'next';

const IconWrapper = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  --user-font-size: ${({ SCALES }) => SCALES.font(1)};
  font-size: var(--user-font-size);
  width: ${({ SCALES }) => SCALES.width(1, "max-content")};
  height: ${({ SCALES }) => SCALES.height(1, "auto")};
  padding: ${({ SCALES }) =>
    `${SCALES.pt(0)} ${SCALES.pr(0.5)} ${SCALES.pb(0)} ${SCALES.pl(0.5)}`};
  margin: ${({ SCALES }) =>
    `${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)}`};
`;

const Icon = styled.span`
  display: inline-block;
  position: relative;
  overflow: hidden;
  /*  border: 1px solid ${({ theme }) => theme.palette.accents_2};
  border-radius: ${({ isSquare, theme }) =>
    isSquare ? theme.layout.radius : "50%"}; */
  vertical-align: top;
  background-color: ${({ theme }) => theme.palette.background};
  box-sizing: border-box;
  width: ${({ SCALES }) => SCALES.width(1.75) || SCALES.height(1.75)};
  height: ${({ SCALES }) => SCALES.height(1.75) || SCALES.width(1.75)};
  padding: ${({ SCALES }) =>
    `${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)} ${SCALES.pl(0)}`};
  margin: ${({ SCALES, marginLeft }) =>
    `${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${marginLeft}`};
`;

Icon.defaultProps = {
  isSquare: true,
  marginLeft: 0, // original was: stacked ? SCALES.ml(-0.625) : SCALES.ml(0)
};

const TextWrapper = styled.div`
  font-size: inherit;
  margin-left: ${({ theme }) => theme.layout.gapHalf};
  display: inline-flex;
  flex-direction: column;
  white-space: nowrap;
`;

const MainText = styled.span`
  font-size: calc(0.89 * var(--user-font-size));
  color: ${({ theme }) => theme.palette.accents_8};
  line-height: 1.1em;
  text-transform: capitalize;
  font-weight: 500;
  max-width: 15rem;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: calc(0.89 * var(--user-font-size));
  color: ${({ theme }) => theme.palette.accents_8};
  line-height: 1.1em;
  text-transform: capitalize;
  font-weight: 500;
  max-width: 15rem;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const SubText = styled.span`
  font-size: calc(0.75 * var(--user-font-size));
  color: ${({ theme }) => theme.palette.accents_6};

  & :global(*: first-child) {
    margin-top: 0;
  }

  & :global(*:last-child) {
    margin-bottom: 0;
  }
`;

const generateThumbnail = (url, quality = "sd") => {
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

// for a base, see: https://github.com/geist-org/geist-ui/blob/master/components/user/user.tsx

const CmsWorkComponent = ({ work }) => {
  const theme = useTheme();
  const { SCALES /* , getScalesProps */ } = useScale();

  // console.log(SCALES);

  // const scale = getScalesProps('scale') /* as number | undefined */; // only need this in order to pass to other component that uses scale

  let [isEditing, setEditing] = useState(false);

  // we use a flat map to add a spacer at the end of each form field
  let generatedFields = convert(Work, {
    prettyLabels: true,
    viewOnly: !isEditing,
  })
    .filter((f) => f !== null)
    .flatMap((f, i) => [f, <Spacer key={i} />]);

  let useLoader = (
    loading,
    fallback,
    loader = <Loading color="white" size="sm" />
  ) => (loading ? loader : fallback);

  const trial = true;

  return trial ? (
    <>
      <Card width="100%">
        <Card.Content>
          <Grid.Container gap={1}>
            <Grid xs={24}>
              <IconWrapper
                theme={theme}
                SCALES={SCALES}
                style={{ paddingLeft: 0, paddingRight: 0 }}
              >
                <Icon theme={theme} SCALES={SCALES}>
                  {work.visible ? (
                    <File size={28} />
                  ) : (
                    <Youtube size={28} color="#fc0d1c" />
                  )}
                </Icon>
                <TextWrapper {...theme} SCALES={SCALES}>
                  <MainText {...theme}>{work.name}</MainText>
                  <SubText {...theme}>JavaScript engineer</SubText>
                </TextWrapper>
              </IconWrapper>

              {/* <Grid.Container>
                  <Grid>
                    <File />
                  </Grid>
                  <Grid style={{ marginLeft: theme.layout.gapHalf }}>Witt</Grid>
                </Grid.Container> */}

              {/* <User src="https://unix.bio/assets/avatar.png" name="Witt" px={0}>
                JavaScript engineer
              </User> */}
            </Grid>
            <Spacer h={1} />
            <Grid xs={24}>
              <Text small>
                {DateTime.now()
                  .diff(
                    (work.createdAt instanceof Date
                      ? DateTime.fromJSDate
                      : DateTime.fromSQL)(work.createdAt)
                  )
                  .shiftTo("years", "days")
                  .normalize()
                  .toHuman({ listStyle: "narrow", unitDisplay: "narrow" })}
              </Text>
            </Grid>
          </Grid.Container>
        </Card.Content>
      </Card>
    </>
  ) : (
    <>
      <Card clickable hoverable width="100%" cover>
        <Card.Header style={{ position: "absolute", zIndex: 1, top: 5 }}>
          <Grid.Container>
            <Grid>
              <Text
                size={12}
                weight="bold"
                transform="uppercase"
                color="#ffffffAA"
              >
                What to watch
              </Text>
              <Text h4 color="white">
                Stream the Acme event
              </Text>
            </Grid>
          </Grid.Container>
        </Card.Header>
        <Card.Body>
          <Card.Image
            src={generateThumbnail(work.thumbnail, "max").src}
            height={340}
            width="100%"
            alt="Card image background"
            style={{ filter: "blur(3px) grayscale(35%) brightness(65 %)" }}
          />
        </Card.Body>

        <Card.Footer
          blur
          style={{
            position: "absolute",
            borderTop: "1px solid rgba(255, 255, 255, 0.2)",
            bottom: 0,
            zIndex: 1,
            backdropFilter: "saturate(180%) blur(10px)",
            background: "#ffffff66",
          }}
          justify="flex-start"
        >
          <Grid.Container justify="space-between">
            <Grid>
              <Text
                b
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {work.name}
              </Text>
              <Text weight={500} style={{ opacity: 0.6 }}>
                edit
              </Text>
            </Grid>
          </Grid.Container>
        </Card.Footer>
      </Card>
    </>
  );
};

CmsWorkComponent.displayName = "CmsWork";

const CmsWork = withScale(CmsWorkComponent);
export default CmsWork;

{
  /* <Card.Footer
        blur
        style={{
          position: "absolute",
          borderTop: "1px solid rgba(255, 255, 255, 0.2)",
          bottom: 0,
          zIndex: 1,
          backdropFilter: "saturate(180%) blur(10px)",
          background: `#ffffff66`,
        }}
      >
        <Row>
          <Col>
            <Text color="#000" size={12}>
              Available soon.
            </Text>
            <Text color="#000" size={12}>
              Get notified.
            </Text>
          </Col>
          <Col>
            <Row justify="flex-end">
              <Button flat auto rounded color="secondary">
                <Text
                  css={{ color: "inherit" }}
                  size={12}
                  weight="bold"
                  transform="uppercase"
                >
                  Notify Me
                </Text>
              </Button>
            </Row>
          </Col>
        </Row>
      </Card.Footer> */
}
