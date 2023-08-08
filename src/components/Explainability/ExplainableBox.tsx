import "./ExplainableBox.css";
import { useState } from "react";
import { MDBCardBody } from "mdb-react-ui-kit";
import Frame from "../Frame/Frame";

export default function ExplainableBox() {
  const [slotValueExplanation, setSlotValueExplanation] = useState<
    JSX.Element[]
  >([]);
  const [neuralExplanation, setNeuralExplanation] = useState<JSX.Element[]>([]);

  return (
    <>
      <div className="row">
        <div className="col md-12">
          <Frame title="Explainable AI - Slot-Value">
            <MDBCardBody className="exp">{slotValueExplanation}</MDBCardBody>
          </Frame>
        </div>
      </div>
      <div className="row">
        <div className="col md-12">
          <Frame title="Explainable AI - Neural Model">
            <MDBCardBody className="exp">{neuralExplanation}</MDBCardBody>
          </Frame>
        </div>
      </div>
    </>
  );
}
