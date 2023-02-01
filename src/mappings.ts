import { Address, BigInt } from '@graphprotocol/graph-ts';
import {
	TitleBought as TitleBoughtEvent,
	TitleCanceled as TitleCanceledEvent,
	TitleListed as TitleListedEvent,
} from '../generated/TitleRegistry/TitleRegistry';
import {
	TitleListed,
	ActiveTitle,
	TitleBought,
	TitleCanceled,
} from '../generated/schema';

export function handleTitleBought(event: TitleBoughtEvent): void {
	// Guardar nuestro evento en el grafo
	// Actualizar nuestros titulos listados

	let titleBought = TitleBought.load(
		getIdFromEventParams(event.params.titleId, event.params.titleAddress)
	);

	let activeTitle = ActiveTitle.load(
		getIdFromEventParams(event.params.titleId, event.params.titleAddress)
	);

	if (!titleBought) {
		titleBought = new TitleBought(
			getIdFromEventParams(event.params.titleId, event.params.titleAddress)
		);
	}

	titleBought.buyer = event.params.buyer;
	titleBought.titleAddress = event.params.titleAddress;
	titleBought.tokenId = event.params.titleId;
	activeTitle!.buyer = event.params.buyer;

	titleBought.save();
	activeTitle!.save();
}

export function handleTitleCanceled(event: TitleCanceledEvent): void {
	let titleCanceled = TitleCanceled.load(
		getIdFromEventParams(event.params.tokenId, event.params.titleAddress)
	);
	let activeTitle = ActiveTitle.load(
		getIdFromEventParams(event.params.tokenId, event.params.titleAddress)
	);

	if (!titleCanceled) {
		titleCanceled = new TitleCanceled(
			getIdFromEventParams(event.params.tokenId, event.params.titleAddress)
		);
	}

	titleCanceled.seller = event.params.seller;
	titleCanceled.titleAddress = event.params.titleAddress;
	titleCanceled.tokenId = event.params.tokenId;
	activeTitle!.buyer = Address.fromString(
		'0x000000000000000000000000000000000000dEaD'
	);
}

export function handleTitleListed(event: TitleListedEvent): void {
	let titleListed = TitleListed.load(
		getIdFromEventParams(event.params.tokenId, event.params.titleAddress)
	);
	let activeTitle = ActiveTitle.load(
		getIdFromEventParams(event.params.tokenId, event.params.titleAddress)
	);

	if (!titleListed) {
		titleListed = new TitleListed(
			getIdFromEventParams(event.params.tokenId, event.params.titleAddress)
		);
	}

	if (!activeTitle) {
		activeTitle = new ActiveTitle(
			getIdFromEventParams(event.params.tokenId, event.params.titleAddress)
		);
	}

	titleListed.seller = event.params.seller;
	activeTitle.seller = event.params.seller;

	titleListed.titleAddress = event.params.titleAddress;
	activeTitle.titleAddress = event.params.titleAddress;

	titleListed.tokenId = event.params.tokenId;
	activeTitle.tokenId = event.params.tokenId;

	titleListed.price = event.params.price;
	activeTitle.price = event.params.price;

	activeTitle.buyer = Address.fromString(
		'0x0000000000000000000000000000000000000000'
	);

	titleListed.save();
	activeTitle.save();
}

function getIdFromEventParams(tokenId: BigInt, titleAddress: Address): string {
	return tokenId.toHexString() + titleAddress.toHexString();
}
