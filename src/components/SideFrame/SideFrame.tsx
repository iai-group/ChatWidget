import React, { useState } from "react";
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
} from "mdb-react-ui-kit";
import RecommendationFrame from "./RecommendationFrame/RecommendationFrame";
import BookmarkFrame from "./BookmarkFrame/BookmarkFrame";
import ResearchTopicFrame from "./ResearchTopicFrame/ResearchTopicFrame";
import { useSocket } from "../../contexts/SocketContext";
// import UserPreferences from "./UserItems/PreferencesFrame";

type SideFrameProps = {
  task_index: number;
};

const SideFrame: React.FC<SideFrameProps> = ({ task_index }) => {
  const { logEvent } = useSocket();
  const [activeTab, setActiveTab] = useState("RT");

  const toggleTab = (tab: string) => {
    logEvent({
      event: "Tab change",
      metadata: { tab: tab },
    });
    if (activeTab !== tab) setActiveTab(tab);
  };

  const activateRecommendationsTab = () => {
    logEvent({
      event: "Tab change",
      metadata: { tab: "recommendation" },
    });
    setActiveTab("recommendation");
  };

  return (
    <MDBContainer>
      <MDBTabs className="mb-2">
        <MDBTabsItem>
          <MDBTabsLink
            onClick={(event) => toggleTab("RT")}
            active={activeTab === "RT"}
          >
            Research Topic
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={(event) => toggleTab("recommendation")}
            active={activeTab === "recommendation"}
          >
            Recommendations
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={(event) => toggleTab("bookmarks")}
            active={activeTab === "bookmarks"}
          >
            Bookmarks
          </MDBTabsLink>
        </MDBTabsItem>
        {/* <MDBTabsItem>
          <MDBTabsLink
            onClick={() => toggleTab("preferences")}
            active={activeTab === "preferences"}
          >
            My Preferences
          </MDBTabsLink>
        </MDBTabsItem> */}
      </MDBTabs>
      <MDBTabsContent>
        <MDBTabsPane show={activeTab === "RT"}>
          <ResearchTopicFrame topic_index={task_index} />
        </MDBTabsPane>
        <MDBTabsPane show={activeTab === "recommendation"}>
          <div
            style={{
              paddingBottom: "5px",
              maxHeight: "max(500px, calc(100vh - 200px))",
              overflowY: "auto",
            }}
          >
            <RecommendationFrame onFrameUpdate={activateRecommendationsTab} />
          </div>
        </MDBTabsPane>
        <MDBTabsPane show={activeTab === "bookmarks"}>
          <BookmarkFrame isActive={activeTab === "bookmarks"} />
        </MDBTabsPane>
        {/* <MDBTabsPane show={activeTab === "preferences"}>
          <UserPreferences isActive={activeTab === "preferences"} />
        </MDBTabsPane> */}
      </MDBTabsContent>
    </MDBContainer>
  );
};

export default SideFrame;
