import {HStack, Modal, Stepper, VStack} from "@navikt/ds-react";
import {PlusIcon} from "@navikt/aksel-icons";
import React, {LegacyRef, useState} from "react";
import SetupFields from "~/components/konsumere/add_konsumer/SetupFields";
import {IConsumer} from "~/types/IConsumer";
import {IConsumerMetadata} from "~/types/IConsumerMetadata";

interface AdjustConsumerModalProps {
  ref: LegacyRef<HTMLDialogElement>
  consumer: IConsumer
  setConsumer: React.Dispatch<React.SetStateAction<IConsumer>>
  consumerMetadata: IConsumerMetadata
  existingConsumer: boolean
}

export default function AdjustConsumerModal({
                                              ref,
                                              consumer,
                                              setConsumer,
                                              consumerMetadata,
                                              existingConsumer
                                            }: AdjustConsumerModalProps) {
  const [activeStep, setActiveStep] = useState(1);

  const requiredFieldsIsSet = () => {
    return !(consumer) || consumer.org && consumer.domain && consumer.package && consumer.version
  }

  const changeStep = (step) => {
    if (activeStep === 1 && !requiredFieldsIsSet()) {
      console.log("Required fields are not set!")
      console.log(consumer)
      return
    }
    setActiveStep(step)
  }

  return (
    <form>
      <Modal
        width="700px"
        ref={ref}
        header={{
          heading: "Ny Konsumer",
          icon: <PlusIcon/>
        }}
      >
        <Modal.Body>
          <VStack padding="2" justify="center" gap="4">
            <HStack justify="center" gap="2">
              {activeStep === 1 && <SetupFields consumerMetadata={consumerMetadata} setConsumer={setConsumer}/>}
            </HStack>
            <HStack justify="space-between">
            </HStack>
          </VStack>
        </Modal.Body>
        <Modal.Footer className="flex justify-center">
          <Stepper
            aria-labelledby="stepper-heading"
            activeStep={activeStep}
            onStepChange={changeStep}
            orientation="horizontal"
          >
            <Stepper.Step href="#">Oppsett</Stepper.Step>
            <Stepper.Step href="#">Ressurser</Stepper.Step>
            <Stepper.Step href="#">Alokering</Stepper.Step>
            <Stepper.Step href="#">Bekreftelse</Stepper.Step>
          </Stepper>
        </Modal.Footer>
      </Modal>
    </form>
  )
}