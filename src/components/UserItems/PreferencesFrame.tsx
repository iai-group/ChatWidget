import { MDBContainer } from "mdb-react-ui-kit";
import { useSocket } from "../../contexts/SocketContext";
import { useCallback, useEffect, useState } from "react";
import PreferenceItem from "./PreferenceItem";

export default function UserPreferences({ isActive }: { isActive: boolean }) {
  const { getPreferences, onPreferences, removePreference } = useSocket();
  const [preferenceState, setPreferenceState] = useState<JSX.Element[]>([]);

  const handleRemovePreference = useCallback(
    (topic: string) => {
      removePreference(topic);
      setPreferenceState((prev) => prev.filter((item) => item.key !== topic));
    },
    [removePreference]
  );

  useEffect(() => {
    if (isActive) {
      getPreferences();
    }
  }, [isActive, getPreferences]);

  useEffect(() => {
    onPreferences((topics: string[]) => {
      const preferenceItems = topics.map((topic, index) => (
        <PreferenceItem
          key={topic}
          topic={topic}
          handleRemovePreference={handleRemovePreference}
        />
      ));
      setPreferenceState(preferenceItems);
    });
  }, [onPreferences, handleRemovePreference]);

  return (
    <MDBContainer>
      <div
        // className="border rounded shadow-sm"
        style={{ maxHeight: "600px", overflowY: "auto" }}
      >
        {preferenceState}
      </div>
    </MDBContainer>
  );
}
