import {HStack, Modal, Stepper, VStack} from "@navikt/ds-react";
import {PlusIcon} from "@navikt/aksel-icons";
import React, {useState} from "react";
import SetupFields from "~/components/konsumere/konsumer_modal/SetupFields";
import {IConsumer} from "~/types/IConsumer";
import {IConsumerMetadata} from "~/types/IConsumerMetadata";
import ResourceFields from "~/components/konsumere/konsumer_modal/ResourceFields";
import {mockConsumer} from "~/mocks/mock_consumer";
import AllocationFields from "~/components/konsumere/konsumer_modal/AllocationFields";

interface AdjustConsumerModalProps {
  openModal: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  initialConsumer: IConsumer
  consumerMetadata: IConsumerMetadata
}

export default function ConsumerModal({
                                        openModal,
                                        setOpenModal,
                                        initialConsumer = mockConsumer,
                                        consumerMetadata
                                      }: AdjustConsumerModalProps) {
  const [activeStep, setActiveStep] = useState(3);
  const [consumer, setConsumer] = useState(initialConsumer)

  const requiredFieldsIsSet = () =>
    requiredOrganisationSelectionIsSet() && consumer.components.length && consumer.version || false;


  const requiredOrganisationSelectionIsSet = () => {
    return consumer.shared || consumer.organisations.length !== 0;
  }

  const changeStep = step =>
    activeStep === 1 && !requiredFieldsIsSet()
      ? console.log("Required fields are not set!")
      : setActiveStep(step)

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
          <VStack padding="2" justify="center" gap="6">
            {activeStep === 1 &&
                <SetupFields consumerMetadata={consumerMetadata} consumer={consumer} setConsumer={setConsumer}/>}
            {activeStep === 2 &&
                <ResourceFields consumer={consumer} setConsumer={setConsumer}/>}
            {activeStep === 3 &&
                <AllocationFields consumer={consumer} setConsumer={setConsumer}/>}
          </VStack>
        </Modal.Body>
        <Modal.Footer className="flex justify-center">
          <HStack>
            <div>1</div>
            <Stepper
              aria-labelledby="stepper-heading"
              activeStep={activeStep}
              onStepChange={changeStep}
              orientation="horizontal"
            >
              <Stepper.Step href="#">Oppsett</Stepper.Step>
              <Stepper.Step href="#">Ressurser</Stepper.Step>
              <Stepper.Step href="#">Ytelse</Stepper.Step>
              <Stepper.Step href="#">Bekreftelse</Stepper.Step>
            </Stepper>
            <div>1</div>
          </HStack>
        </Modal.Footer>
      </Modal>
    </form>
  )
}
