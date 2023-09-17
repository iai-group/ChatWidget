import React, { useState } from "react";
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
} from "mdb-react-ui-kit";
import RecommendationFrame from "./Recommendation/RecommendationFrame";
import BookmarkFrame from "./UserItems/BookmarkFrame";
import UserPreferences from "./UserItems/PreferencesFrame";

const SideFrame: React.FC = () => {
  const [activeTab, setActiveTab] = useState("recommendation");

  const toggleTab = (tab: string) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const activateRecommendationsTab = () => {
    setActiveTab("recommendation");
  };

  return (
    <MDBContainer>
      <MDBTabs className="mb-2">
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => toggleTab("recommendation")}
            active={activeTab === "recommendation"}
          >
            Recommendations
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => toggleTab("bookmarks")}
            active={activeTab === "bookmarks"}
          >
            My Articles
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => toggleTab("preferences")}
            active={activeTab === "preferences"}
          >
            My Preferences
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>
      <MDBTabsContent>
        <MDBTabsPane show={activeTab === "recommendation"}>
          <MDBContainer>
            <div style={{ maxHeight: "500px", overflowY: "auto" }}>
              <RecommendationFrame onFrameUpdate={activateRecommendationsTab} />
            </div>
          </MDBContainer>
        </MDBTabsPane>
        <MDBTabsPane show={activeTab === "bookmarks"}>
          <BookmarkFrame isActive={activeTab === "bookmarks"} />
        </MDBTabsPane>
        <MDBTabsPane show={activeTab === "preferences"}>
          <UserPreferences isActive={activeTab === "preferences"} />
        </MDBTabsPane>
      </MDBTabsContent>
    </MDBContainer>
  );
};

export default SideFrame;
