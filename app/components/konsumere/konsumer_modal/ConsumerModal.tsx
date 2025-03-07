import {HStack, Modal, Stepper, VStack} from "@navikt/ds-react";
import {PlusIcon} from "@navikt/aksel-icons";
import React, {useState} from "react";
import SetupPage from "~/components/konsumere/konsumer_modal/SetupPage";
import {IConsumer} from "~/types/IConsumer";
import {IConsumerMetadata} from "~/types/IConsumerMetadata";
import ResourcePage from "~/components/konsumere/konsumer_modal/ResourcePage";
import {mockConsumer} from "~/mocks/mock_consumer";
import AllocationPage from "~/components/konsumere/konsumer_modal/AllocationPage";
import ConfirmationPage from "~/components/konsumere/konsumer_modal/ConfirmationPage";

interface AdjustConsumerModalProps {
  openModal: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  initialConsumer: IConsumer
  consumerMetadata: IConsumerMetadata
  editing: boolean
}

export default function ConsumerModal({
                                        openModal,
                                        setOpenModal,
                                        initialConsumer = mockConsumer,
                                        editing = false,
                                        consumerMetadata
                                      }: AdjustConsumerModalProps) {
  const [activeStep, setActiveStep] = useState(4);
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
                <SetupPage editing={editing} consumerMetadata={consumerMetadata} consumer={consumer} setConsumer={setConsumer}/>}
            {activeStep === 2 && <ResourcePage consumer={consumer} setConsumer={setConsumer}/>}
            {activeStep === 3 && <AllocationPage consumer={consumer} setConsumer={setConsumer}/>}
            {activeStep === 4 && <ConfirmationPage/>}
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
