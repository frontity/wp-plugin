/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { string, bool, func, arrayOf, shape } from "prop-types";
import { inject } from "mobx-react";
import styled from "styled-components";
import { Box, Heading, Paragraph, Button } from "grommet";
import SiteIdJustRequested from "./SiteIdJustRequested";
import SiteIdRequested from "./SiteIdRequested";
import RequestForm from "./RequestForm";

import frontityThemeImage from "../../assets/frontity-theme.png";

const WithoutSiteId = ({
  siteUrl,
  siteIdRequested,
  siteIdJustRequested,
  sendRequest,
  setSiteIdRequested,
  descriptionTitleText,
  descriptionContentText,
  descriptionFeatures,
  descriptionImageFooterText,
  descriptionButtonText,
  notifications,
  requestAlreadyLinkText,
  requestButtonText,
}) => {
  if (siteIdRequested)
    return siteIdJustRequested ? <SiteIdJustRequested /> : <SiteIdRequested />;

  return (
    <>
      <Container>
        <InnerContainer>
          <Image alt="Frontity Theme" src={`${siteUrl}${frontityThemeImage}`} />
          <Footer>
            <Paragraph margin={{ vertical: "0" }}>
              {descriptionImageFooterText}
            </Paragraph>
          </Footer>
        </InnerContainer>
        <InnerContainer>
          <Heading size="small" margin={{ top: "0", bottom: "16px" }}>
            {descriptionTitleText}
          </Heading>
          <Paragraph margin={{ top: "0", bottom: "24px" }}>
            {descriptionContentText}
          </Paragraph>
          <Box>
            {descriptionFeatures.map(feature => (
              <Box key={feature.title}>
                <Heading level={4} margin={{ top: "0", bottom: "4px" }}>
                  {feature.title}
                </Heading>
                <Paragraph margin={{ top: "0", bottom: "12px" }}>
                  {feature.content}
                </Paragraph>
              </Box>
            ))}
          </Box>
          <ViewDemoButton
            label={descriptionButtonText}
            href="https://frontity.com/demo?utm_source=plugin-dashboard&utm_medium=cta-button&utm_campaign=plugin-dashboard"
            target="_blank"
          />
        </InnerContainer>
      </Container>
      <Separator />
      {notifications.map((notification, index) => (
        <Notification
          key={notification.highlight}
          margin={{ bottom: index ? "16px" : "8px" }}
        >
          <StyledParagraph margin={{ vertical: "0", horizontal: "0" }}>
            <strong>{notification.highlight} </strong>
            {notification.content}
          </StyledParagraph>
        </Notification>
      ))}
      <RequestForm />
      <Box direction="row" justify="between" align="center">
        <Link onClick={setSiteIdRequested}>{requestAlreadyLinkText}</Link>
        <Button primary label={requestButtonText} onClick={sendRequest} />
      </Box>
    </>
  );
};

WithoutSiteId.propTypes = {
  siteUrl: string.isRequired,
  siteIdRequested: bool.isRequired,
  siteIdJustRequested: bool.isRequired,
  sendRequest: func.isRequired,
  setSiteIdRequested: func.isRequired,
  descriptionTitleText: string.isRequired,
  descriptionContentText: string.isRequired,
  descriptionFeatures: arrayOf(shape({ title: string, content: string }))
    .isRequired,
  descriptionImageFooterText: string.isRequired,
  descriptionButtonText: string.isRequired,
  notifications: arrayOf(shape({ highlight: string, content: string }))
    .isRequired,
  requestAlreadyLinkText: string.isRequired,
  requestButtonText: string.isRequired,
};

export default inject(
  ({ stores: { general, settings, request, languages } }) => {
    const description = "home.withoutSiteId.description";
    const requestForm = "home.withoutSiteId.requestForm";

    return {
      siteUrl: general.site,
      siteIdRequested: settings.site_id_requested,
      siteIdJustRequested: general.siteIdJustRequested,
      sendRequest: request.sendRequest,
      setSiteIdRequested: () => settings.setSiteIdRequested(true),
      descriptionTitleText: languages.get(`${description}.title`),
      descriptionContentText: languages.get(`${description}.content`),
      descriptionFeatures: languages.get(`${description}.features`),
      descriptionImageFooterText: languages.get(`${description}.imageFooter`),
      descriptionButtonText: languages.get(`${description}.viewDemoButton`),
      notifications: languages.get("home.withoutSiteId.notifications"),
      requestAlreadyLinkText: languages.get(`${requestForm}.alreadyLink`),
      requestButtonText: languages.get(`${requestForm}.requestButton`),
    };
  }
)(WithoutSiteId);

const Notification = styled(Box)`
  border-radius: 4px;
  background-color: #fff;
  padding: 8px;
  box-shadow: 0 1px 4px 0 rgba(31, 56, 197, 0.12);
`;

const StyledParagraph = styled(Paragraph)`
  max-width: 100%;
`;

const Separator = styled.div`
  width: 608px;
  height: 2px;
  opacity: 0.08;
  background-color: #1f38c5;
  margin-bottom: 40px;
`;

const Link = styled.a`
  color: #1f38c5;
  text-decoration: underline;
`;

const Image = styled.img`
  width: 224px;
  height: 397px;
  border-radius: 4px;
  margin-bottom: 8px;
  box-shadow: 0 2px 24px 0 rgba(0, 0, 0, 0.15);
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  margin: 40px 0;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;

  &:first-of-type {
    width: 224px;
    margin-right: 32px;
  }
`;

const ViewDemoButton = styled(Button)`
  width: 140px;
  align-self: flex-end;
`;

const Footer = styled(Box)`
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 rgba(31, 56, 197, 0.12),
    0 4px 14px 0 rgba(31, 56, 197, 0.09);
  background-color: #ffffff;
  padding: 8px;
`;
