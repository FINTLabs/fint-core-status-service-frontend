import {IConsumer} from "~/types/IConsumer";

interface ResourceFieldsProps {
  consumer: IConsumer
  setConsumer: React.Dispatch<React.SetStateAction<IConsumer>>
}

export default function ResourceFields({consumer, setConsumer}: ResourceFieldsProps) {
  return (
    <>
      hi
    </>
  )
}