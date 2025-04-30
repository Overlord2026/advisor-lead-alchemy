
import React from "react";
import SharedHeader from "./SharedHeader";

const BannerHeader = () => {
  return (
    <div data-testid="banner-header">
      <SharedHeader portalType="advisor" />
    </div>
  );
};

export default BannerHeader;
