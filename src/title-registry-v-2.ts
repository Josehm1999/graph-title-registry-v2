import { BigInt } from '@graphprotocol/graph-ts';
import {
  titleRegistryV2,
  PropertyBought as PropertyBoughtEvent,
  PropertyChangedAvailability as PropertyChangedAvailabilityEvent,
  PropertyListed as PropertyListedEvent,
  PropertyStatusChanged as PropertyStatusChangedEvent,
  RegionalAdminCreated as RegionalAdminCreatedEvent,
  TransactionCanceled as TransactionCanceledEvent,
  TransferSuccess as TransferSuccessEvent
} from '../generated/titleRegistryV2/titleRegistryV2';
import {
  PropertyBought,
  PropertyChangedAvailability,
  PropertyListed,
  PropertyStatusChanged,
  RegionalAdminCreated,
  TransactionCanceled,
  TransferSuccess
} from '../generated/schema';

export function handlePropertyBought(event: PropertyBoughtEvent): void {}

export function handlePropertyChangedAvailability(
  event: PropertyChangedAvailabilityEvent
): void {}

export function handlePropertyListed(event: PropertyListedEvent): void {}

export function handlePropertyStatusChanged(
  event: PropertyStatusChangedEvent
): void {}

export function handleRegionalAdminCreated(
  event: RegionalAdminCreatedEvent
): void {}

export function handleTransactionCanceled(
  event: TransactionCanceledEvent
): void {}

export function handleTransferSuccess(event: TransferSuccessEvent): void {}
