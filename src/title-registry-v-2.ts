import { Address, BigInt } from '@graphprotocol/graph-ts';
import {
  PropertyBought as PropertyBoughtEvent,
  PropertyChangedAvailability as PropertyChangedAvailabilityEvent,
  PropertyListed as PropertyListedEvent,
  PropertyRequestStatusChanged as PropertyRequestStatusChangedEvent,
  RegionalAdminCreated as RegionalAdminCreatedEvent,
  TransactionCanceled as TransactionCanceledEvent,
  TransferSuccess as TransferSuccessEvent
} from '../generated/titleRegistryV2/titleRegistryV2';
import {
  PropertyBought,
  PropertyChangedAvailability,
  PropertyListed,
  PropertyRequestStatusChanged,
  RegionalAdminCreated,
  AvailableProperty,
  TransactionCanceled
} from '../generated/schema';

export function handlePropertyBought(event: PropertyBoughtEvent): void {
  let propertyBought = PropertyBought.load(
    getIdFromEventParams(event.params.surveyNumber, event.params.buyer)
  );

  let availableProperty = AvailableProperty.load(
    getIdFromEventParams(event.params.surveyNumber, event.params.buyer)
  );

  if (!propertyBought) {
    propertyBought = new PropertyBought(
      getIdFromEventParams(event.params.surveyNumber, event.params.buyer)
    );
  }

  propertyBought.buyer = event.params.buyer;
  propertyBought.surveyNumber = event.params.surveyNumber;
  availableProperty!.buyer = event.params.buyer;
  propertyBought.save();
  availableProperty!.save();
}

export function handlePropertyChangedAvailability(
  event: PropertyChangedAvailabilityEvent
): void {}

export function handlePropertyListed(event: PropertyListedEvent): void {
  let propertyListed = PropertyListed.load(
    getIdFromEventParams(event.params.surveyNumber, event.params.seller)
  );

  let availableProperty = AvailableProperty.load(
    getIdFromEventParams(event.params.surveyNumber, event.params.seller)
  );

  if (!propertyListed) {
    propertyListed = new PropertyListed(
      getIdFromEventParams(event.params.surveyNumber, event.params.seller)
    );
  }

  if (!availableProperty) {
    availableProperty = new AvailableProperty(
      getIdFromEventParams(event.params.surveyNumber, event.params.seller)
    );
  }

  propertyListed.seller = event.params.seller;
  availableProperty.seller = event.params.seller;

  propertyListed.surveyNumber = event.params.surveyNumber;
  availableProperty.surveyNumber = event.params.surveyNumber;
}

export function handlePropertyStatusChanged(
  event: PropertyRequestStatusChangedEvent
): void {
  let property_status_change = PropertyRequestStatusChanged.load(
    getIdFromEventParamsWithNumbers(
      event.params.surveyNumber,
      event.params.seller
    )
  );

  if (!property_status_change) {
    property_status_change = new PropertyRequestStatusChanged(
      getIdFromEventParams(event.params.surveyNumber, event.params.seller)
    );

  }
  let propertyListed = PropertyListed.load(
      getIdFromEventParams(event.params.surveyNumber, event.params.seller)
  )

  propertyListed!.ReqStatus = event.params.param1;
}

export function handleRegionalAdminCreated(
  event: RegionalAdminCreatedEvent
): void {
  let new_regional_admin = RegionalAdminCreated.load(
    getIdFromEventParamsWithString(
      event.params.district,
      event.params.regionalAdmin
    )
  );

  if (!new_regional_admin) {
    new_regional_admin = new RegionalAdminCreated(
      getIdFromEventParamsWithString(
        event.params.district,
        event.params.regionalAdmin
      )
    );
  }
}

export function handleTransactionCanceled(
  event: TransactionCanceledEvent
): void {
  let transactionCanceled = TransactionCanceled.load(
    getIdFromEventParams(event.params.surveyNumber, event.params.seller)
  );

  let availableProperty = AvailableProperty.load(
    getIdFromEventParams(event.params.surveyNumber, event.params.seller)
  );

  if (!transactionCanceled) {
    transactionCanceled = new TransactionCanceled(
      getIdFromEventParams(event.params.surveyNumber, event.params.seller)
    );
  }

  transactionCanceled.seller = event.params.seller;
  transactionCanceled.surveyNumber = event.params.surveyNumber;
  availableProperty!.buyer = Address.fromString(
    '0x000000000000000000000000000000000000dEaD'
  );
}

function getIdFromEventParamsWithNumbers(
  surveyNumber: BigInt,
  status: Number
): string {
  return surveyNumber.toHexString() + status.toString();
}

function getIdFromEventParams(surveyNumber: BigInt, buyer: Address): string {
  return surveyNumber.toHexString() + buyer.toHexString();
}

function getIdFromEventParamsWithString(
  district: string,
  admin: Address
): string {
  return district.toString() + admin.toHexString();
}
