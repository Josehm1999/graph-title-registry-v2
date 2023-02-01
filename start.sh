#!/usr/bin/env bash

docker cp ~/ipfs/. docker-ipfs-1:/ipfs;
docker exec -it docker-ipfs-1  ipfs add -r /ipfs/.;
cd ~/projects_tesis/graph-title-registry-app/;
yarn create-local -y;
yarn deploy-local -l v0.0.1;
cd ~/projects_tesis/blockchain-Training/hardhat-title-registry-system/;
yarn hardhat run scripts/mint-and-list.ts --network localhost;
yarn hardhat run scripts/mint-and-list.ts --network localhost;
