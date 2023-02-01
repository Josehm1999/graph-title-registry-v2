import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  TitleBought,
  TitleCanceled,
  TitleListed
} from "../generated/TitleRegistry/TitleRegistry"

export function createTitleBoughtEvent(
  buyer: Address,
  titleAddress: Address,
  titleId: BigInt,
  price: BigInt
): TitleBought {
  let titleBoughtEvent = changetype<TitleBought>(newMockEvent())

  titleBoughtEvent.parameters = new Array()

  titleBoughtEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )
  titleBoughtEvent.parameters.push(
    new ethereum.EventParam(
      "titleAddress",
      ethereum.Value.fromAddress(titleAddress)
    )
  )
  titleBoughtEvent.parameters.push(
    new ethereum.EventParam(
      "titleId",
      ethereum.Value.fromUnsignedBigInt(titleId)
    )
  )
  titleBoughtEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )

  return titleBoughtEvent
}

export function createTitleCanceledEvent(
  seller: Address,
  titleAddress: Address,
  tokenId: BigInt
): TitleCanceled {
  let titleCanceledEvent = changetype<TitleCanceled>(newMockEvent())

  titleCanceledEvent.parameters = new Array()

  titleCanceledEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )
  titleCanceledEvent.parameters.push(
    new ethereum.EventParam(
      "titleAddress",
      ethereum.Value.fromAddress(titleAddress)
    )
  )
  titleCanceledEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return titleCanceledEvent
}

export function createTitleListedEvent(
  seller: Address,
  titleAddress: Address,
  tokenId: BigInt,
  price: BigInt
): TitleListed {
  let titleListedEvent = changetype<TitleListed>(newMockEvent())

  titleListedEvent.parameters = new Array()

  titleListedEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )
  titleListedEvent.parameters.push(
    new ethereum.EventParam(
      "titleAddress",
      ethereum.Value.fromAddress(titleAddress)
    )
  )
  titleListedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  titleListedEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )

  return titleListedEvent
}
