import {HStack, Modal, Stepper} from "@navikt/ds-react";
import {PlusIcon} from "@navikt/aksel-icons";
import React, {useState} from "react";
import SetupPage from "~/components/konsumere/konsumer_modal/SetupPage";
import {consumerFromRequest, newConsumer} from "~/types/consumer/IConsumer";
import {IConsumerMetadata} from "~/types/consumer/IConsumerMetadata";
import ResourcePage from "~/components/konsumere/konsumer_modal/ResourcePage";
import AllocationPage from "~/components/konsumere/konsumer_modal/AllocationPage";
import ConfirmationPage from "~/components/konsumere/konsumer_modal/ConfirmationPage";
import {IConsumerRequest} from "~/types/consumer/IConsumerRequest";

interface AdjustConsumerModalProps {
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
                                        initialConsumer,
                                        editing = false,
                                      }: AdjustConsumerModalProps) {
  const [activeStep, setActiveStep] = useState(1);
  const [consumerFields, setConsumerFields] = useState(
    initialConsumer != undefined
      ? consumerFromRequest(initialConsumer)
      : newConsumer()
  )

  const moveStep = (step) => {
    if (
      !consumerFields.version ||
      (consumerFields.organisations.length === 0 && !consumerFields.shared) ||
      Object.keys(consumerFields.components).length === 0
    ) {
      alert("Required fields are not set");
      return;
    }
    setActiveStep(step);
  };


  const steps = [
    <SetupPage
      key="setup"
      editing={editing}
      consumerMetadata={consumerMetadata}
      consumer={consumerFields}
      setConsumer={setConsumerFields}
    />,
    <ResourcePage
      key="resource"
      consumer={consumerFields}
      setConsumer={setConsumerFields}
    />,
    <AllocationPage
      key="allocation"
      consumer={consumerFields}
      setConsumer={setConsumerFields}
    />,
    <ConfirmationPage
      key="confirmation"
      editing={editing}
      initialConsumer={initialConsumer}
      consumer={consumerFields}
    />
  ];

  return (
    <form>
      <Modal
        width="700px"
        open={openModal}
        onClose={() => setOpenModal(false)}
        header={{
          heading: "Ny Konsumer",
          icon: <PlusIcon/>
        }}
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
