import {IConsumer} from "~/types/IConsumer";

interface AllocationFieldsProps {
  consumer: IConsumer
  setConsumer: React.Dispatch<React.SetStateAction<IConsumer>>
}

export default function AllocationFields({consumer, setConsumer}: AllocationFieldsProps) {
  return (
    <>
      hi
    </>
  )
}