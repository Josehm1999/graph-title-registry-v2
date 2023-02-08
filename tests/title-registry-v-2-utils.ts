import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  PropertyBought,
  PropertyChangedAvailability,
  PropertyListed,
  PropertyStatusChanged,
  RegionalAdminCreated,
  TransactionCanceled,
  TransferSuccess
} from "../generated/titleRegistryV2/titleRegistryV2"

export function createPropertyBoughtEvent(
  buyer: Address,
  surveyNumber: BigInt,
  price: BigInt
): PropertyBought {
  let propertyBoughtEvent = changetype<PropertyBought>(newMockEvent())

  propertyBoughtEvent.parameters = new Array()

  propertyBoughtEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )
  propertyBoughtEvent.parameters.push(
    new ethereum.EventParam(
      "surveyNumber",
      ethereum.Value.fromUnsignedBigInt(surveyNumber)
    )
  )
  propertyBoughtEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )

  return propertyBoughtEvent
}

export function createPropertyChangedAvailabilityEvent(
  surveyNumber: BigInt
): PropertyChangedAvailability {
  let propertyChangedAvailabilityEvent = changetype<
    PropertyChangedAvailability
  >(newMockEvent())

  propertyChangedAvailabilityEvent.parameters = new Array()

  propertyChangedAvailabilityEvent.parameters.push(
    new ethereum.EventParam(
      "surveyNumber",
      ethereum.Value.fromUnsignedBigInt(surveyNumber)
    )
  )

  return propertyChangedAvailabilityEvent
}

export function createPropertyListedEvent(
  seller: Address,
  surveyNumber: BigInt,
  price: BigInt
): PropertyListed {
  let propertyListedEvent = changetype<PropertyListed>(newMockEvent())

  propertyListedEvent.parameters = new Array()

  propertyListedEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )
  propertyListedEvent.parameters.push(
    new ethereum.EventParam(
      "surveyNumber",
      ethereum.Value.fromUnsignedBigInt(surveyNumber)
    )
  )
  propertyListedEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )

  return propertyListedEvent
}

export function createPropertyStatusChangedEvent(
  surveyNumber: BigInt,
  param1: i32
): PropertyStatusChanged {
  let propertyStatusChangedEvent = changetype<PropertyStatusChanged>(
    newMockEvent()
  )

  propertyStatusChangedEvent.parameters = new Array()

  propertyStatusChangedEvent.parameters.push(
    new ethereum.EventParam(
      "surveyNumber",
      ethereum.Value.fromUnsignedBigInt(surveyNumber)
    )
  )
  propertyStatusChangedEvent.parameters.push(
    new ethereum.EventParam(
      "param1",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(param1))
    )
  )

  return propertyStatusChangedEvent
}

export function createRegionalAdminCreatedEvent(
  regionalAdmin: Address,
  district: string
): RegionalAdminCreated {
  let regionalAdminCreatedEvent = changetype<RegionalAdminCreated>(
    newMockEvent()
  )

  regionalAdminCreatedEvent.parameters = new Array()

  regionalAdminCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "regionalAdmin",
      ethereum.Value.fromAddress(regionalAdmin)
    )
  )
  regionalAdminCreatedEvent.parameters.push(
    new ethereum.EventParam("district", ethereum.Value.fromString(district))
  )

  return regionalAdminCreatedEvent
}

export function createTransactionCanceledEvent(
  seller: Address,
  surveyNumber: BigInt
): TransactionCanceled {
  let transactionCanceledEvent = changetype<TransactionCanceled>(newMockEvent())

  transactionCanceledEvent.parameters = new Array()

  transactionCanceledEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )
  transactionCanceledEvent.parameters.push(
    new ethereum.EventParam(
      "surveyNumber",
      ethereum.Value.fromUnsignedBigInt(surveyNumber)
    )
  )

  return transactionCanceledEvent
}

export function createTransferSuccessEvent(): TransferSuccess {
  let transferSuccessEvent = changetype<TransferSuccess>(newMockEvent())

  transferSuccessEvent.parameters = new Array()

  return transferSuccessEvent
}
