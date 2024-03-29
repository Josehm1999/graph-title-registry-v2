import { Address, BigInt, Bytes } from '@graphprotocol/graph-ts';
import {
  PropertyBought as PropertyBoughtEvent,
  PropertyChangedAvailability as PropertyChangedAvailabilityEvent,
  PropertyListed as PropertyListedEvent,
  PropertyRequestStatusChanged as PropertyRequestStatusChangedEvent,
  RegionalAdminCreated as RegionalAdminCreatedEvent,
  TransactionCanceled as TransactionCanceledEvent
} from '../generated/titleRegistryV2/titleRegistryV2';
import {
  PropertyBought,
  PropertyListed,
  RegionalAdmin
} from '../generated/schema';

export function handlePropertyBought(event: PropertyBoughtEvent): void {
  let property_listed = PropertyListed.load(
    getIdFromEventParams(event.params.surveyNumber, event.params.seller)
  );

  let property_bought = PropertyBought.load(
    getIdFromEventParams(event.params.surveyNumber, event.params.buyer)
  );

  if (!property_bought) {
    property_bought = new PropertyBought(
      getIdFromEventParams(event.params.surveyNumber, event.params.buyer)
    );
  }

  property_bought.seller = event.params.seller;
  property_bought.buyer = event.params.buyer;
  property_bought.surveyNumber = event.params.surveyNumber;
  property_bought.marketValue = event.params.marketValue;
  property_bought.updatedAt = event.block.timestamp;
  property_bought.save();

  if (property_listed) {
    property_listed.seller = event.params.buyer;
    property_listed.ReqStatus = 0;
    property_listed.requester = Bytes.fromHexString(
      '0x0000000000000000000000000000000000000000'
    );
    property_listed.isAvailable = false;
    property_listed.updatedAt = event.block.timestamp;
    property_listed.save();
  }

  let bought_property = PropertyBought.load(
    getIdFromEventParams(event.params.surveyNumber, event.params.seller)
  );

  if (bought_property) {
    let property_new_listing = PropertyListed.load(
      getIdFromEventParams(
        event.params.surveyNumber,
        Address.fromBytes(bought_property.seller)
      )
    );

    if (property_new_listing) {
      property_new_listing.seller = event.params.buyer;
      property_new_listing.ReqStatus = 0;
      property_new_listing.requester = Bytes.fromHexString(
        '0x0000000000000000000000000000000000000000'
      );
      property_new_listing.isAvailable = false;
      property_new_listing.updatedAt = event.block.timestamp;
      property_new_listing.save();
    }
  }
}

export function handlePropertyChangedAvailability(
  event: PropertyChangedAvailabilityEvent
): void {
  let property_listed = PropertyListed.load(
    getIdFromEventParams(event.params.surveyNumber, event.params.seller)
  );

  if (property_listed) {
    property_listed.isAvailable = event.params.isAvailable;
    property_listed.save();
  }

  let bought_property = PropertyBought.load(
    getIdFromEventParams(event.params.surveyNumber, event.params.seller)
  );

  if (bought_property) {
    let property_new_listing = PropertyListed.load(
      getIdFromEventParams(
        event.params.surveyNumber,
        Address.fromBytes(bought_property.seller)
      )
    );

    if (property_new_listing) {
      property_new_listing.isAvailable = event.params.isAvailable;
      property_new_listing.save();
    }
  }
}

export function handlePropertyListed(event: PropertyListedEvent): void {
  let property_listed = PropertyListed.load(
    getIdFromEventParams(event.params.surveyNumber, event.params.seller)
  );

  if (!property_listed) {
    property_listed = new PropertyListed(
      getIdFromEventParams(event.params.surveyNumber, event.params.seller)
    );
  }

  property_listed.seller = event.params.seller;
  property_listed.surveyNumber = event.params.surveyNumber;
  property_listed.state = event.params.state;
  property_listed.district = event.params.district;
  property_listed.neighborhood = event.params.neighborhood;
  property_listed.marketValue = event.params.marketValue;
  property_listed.isAvailable = event.params.isAvailable;
  property_listed.requester = event.params.requester;
  property_listed.ReqStatus = event.params.param8;
  property_listed.updatedAt = event.block.timestamp;
  property_listed.save();
}

export function handlePropertyStatusChanged(
  event: PropertyRequestStatusChangedEvent
): void {
  let propertyListed = PropertyListed.load(
    getIdFromEventParams(event.params.surveyNumber, event.params.seller)
  );

  if (propertyListed) {
    if (event.params.param2 === 1) {
      propertyListed.ReqStatus = event.params.param2;
      propertyListed.requester = event.address;
      propertyListed.save();
    }
    propertyListed.ReqStatus = event.params.param2;
    propertyListed.requester = Bytes.fromHexString(
      '0x0000000000000000000000000000000000000000'
    );
    propertyListed.save();
  }

  let bought_property = PropertyBought.load(
    getIdFromEventParams(event.params.surveyNumber, event.params.seller)
  );

  if (bought_property) {
    let property_new_listing = PropertyListed.load(
      getIdFromEventParams(
        event.params.surveyNumber,
        Address.fromBytes(bought_property.seller)
      )
    );

    if (property_new_listing) {
      if (event.params.param2 === 1) {
        property_new_listing.ReqStatus = event.params.param2;
        property_new_listing.requester = event.address;
        property_new_listing.save();
      }
      property_new_listing.ReqStatus = event.params.param2;
      property_new_listing.requester = Bytes.fromHexString(
        '0x0000000000000000000000000000000000000000'
      );
      property_new_listing.save();
    }
  }
}

export function handleRegionalAdminCreated(
  event: RegionalAdminCreatedEvent
): void {
  let new_regional_admin = RegionalAdmin.load(
    getIdFromEventParamsWithString(
      event.params.district,
      event.params.regionalAdmin
    )
  );

  if (!new_regional_admin) {
    new_regional_admin = new RegionalAdmin(
      getIdFromEventParamsWithString(
        event.params.district,
        event.params.regionalAdmin
      )
    );
  }

  new_regional_admin.district = event.params.district;
  new_regional_admin.regionalAdmin = event.params.regionalAdmin;
  new_regional_admin.updatedAt = event.block.timestamp;
  new_regional_admin.save();
}

export function handleTransactionCanceled(
  event: TransactionCanceledEvent
): void {
  let property_listed = PropertyListed.load(
    getIdFromEventParams(event.params.surveyNumber, event.params.seller)
  );

  if (property_listed) {
    property_listed.ReqStatus = 0;
    property_listed.requester = Bytes.fromHexString(
      '0x0000000000000000000000000000000000000000'
    );
    property_listed.save();
  }

  let bought_property = PropertyBought.load(
    getIdFromEventParams(event.params.surveyNumber, event.params.seller)
  );

  if (bought_property) {
    let property_new_listing = PropertyListed.load(
      getIdFromEventParams(
        event.params.surveyNumber,
        Address.fromBytes(bought_property.seller)
      )
    );

    if (property_new_listing) {
      property_new_listing.ReqStatus = 0;
      property_new_listing.requester = Bytes.fromHexString(
        '0x0000000000000000000000000000000000000000'
      );
      property_new_listing.save();
    }
  }
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
