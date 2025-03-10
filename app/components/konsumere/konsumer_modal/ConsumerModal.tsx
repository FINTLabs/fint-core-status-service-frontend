import {HStack, Modal, Stepper} from "@navikt/ds-react";
import {DocPencilIcon, PlusIcon} from "@navikt/aksel-icons";
import React, {useState} from "react";
import SetupPage from "~/components/konsumere/konsumer_modal/SetupPage";
import {consumerFromRequest, newConsumer} from "~/types/consumer/IConsumer";
import {IConsumerMetadata} from "~/types/consumer/IConsumerMetadata";
import ResourcePage from "~/components/konsumere/konsumer_modal/ResourcePage";
import AllocationPage from "~/components/konsumere/konsumer_modal/AllocationPage";
import {IConsumerRequest} from "~/types/consumer/IConsumerRequest";
import {mockConsumerRequest} from "~/mocks/mock_consumer";
import DeployPage from "~/components/konsumere/konsumer_modal/DeployPage";

interface ConsumerModalProps {
  openModal: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  consumerMetadata: IConsumerMetadata
  editing: boolean
  initialConsumer?: IConsumerRequest
}

export default function ConsumerModal({
                                        openModal,
                                        setOpenModal,
                                        consumerMetadata,
                                        initialConsumer = mockConsumerRequest,
                                      }: ConsumerModalProps) {
  const [activeStep, setActiveStep] = useState(3);
  const editing = initialConsumer != undefined
  const [consumer, setConsumer] = useState(
    initialConsumer != undefined
      ? consumerFromRequest(initialConsumer)
      : newConsumer()
  )

  const moveStep = (step) => {
    if (
      !consumer.version ||
      (consumer.organisations.length === 0 && !consumer.shared) ||
      Object.keys(consumer.components).length === 0
    ) {
      alert("Required fields are not set");
      return;
    }
    setActiveStep(step);
  };

  const header = editing
    ? {
      heading: `${initialConsumer?.domain} ${initialConsumer?.package} - ${initialConsumer?.org}`,
      icon: <DocPencilIcon/>
    }
    : {
      heading: "Ny Konsumer",
      icon: <PlusIcon/>
    };

  const steps = [
    <SetupPage
      key="setup"
      editing={editing}
      consumerMetadata={consumerMetadata}
      consumer={consumer}
      setConsumer={setConsumer}
    />,
    <ResourcePage
      key="resource"
      consumer={consumer}
      setConsumer={setConsumer}
    />,
    <AllocationPage
      key="allocation"
      consumer={consumer}
      setConsumer={setConsumer}
    />,
    <DeployPage/>
  ];

  return (
    <form>
      <Modal
        width="700px"
        open={openModal}
        onClose={() => setOpenModal(false)}
        header={header}
      >
        <Modal.Body>
          {steps[activeStep - 1]}
        </Modal.Body>
        <Modal.Footer className="flex justify-center">
          <HStack>
            <Stepper
              aria-labelledby="stepper-heading"
              activeStep={activeStep}
              onStepChange={moveStep}
              orientation="horizontal"
            >
              <Stepper.Step href="#">Oppsett</Stepper.Step>
              <Stepper.Step href="#">Ressurser</Stepper.Step>
              <Stepper.Step href="#">Ytelse</Stepper.Step>
              <Stepper.Step href="#">Bekreftelse</Stepper.Step>
            </Stepper>
          </HStack>
        </Modal.Footer>
      </Modal>
    </form>
  )
}
