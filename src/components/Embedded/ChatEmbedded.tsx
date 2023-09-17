import { ConfigContext } from "../../contexts/ConfigContext";
import "./ChatEmbedded.css";
import { ReactNode, useContext } from "react";

import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";

import SideFrame from "../SideFrame";

export default function ChatEmbedded({ children }: { children: ReactNode }) {
  const { config } = useContext(ConfigContext);

  if (config.useRecommendationFrame) {
    return (
      <MDBContainer>
        <MDBRow>
          <MDBCol md="6">{children}</MDBCol>
          <MDBCol md="6">
            <SideFrame />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  } else {
    return <>{children}</>;
  }
}
