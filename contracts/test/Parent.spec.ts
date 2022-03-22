// TOP Contract Parent.sol <- Child.sol
//  and         Parent.sol <- Grapes.sol (claim Contract)

import chai, { expect } from 'chai';
import { BigNumber, Contract, constants, utils } from 'ethers';
import { solidity, MockProvider, createFixtureLoader, deployContract } from 'ethereum-waffle';

import ParentContract from '../build/ParentContract.json';

import Grapes from '../build/Grapes.json';

chai.use(solidity);

const overrides = {
    gasLimit: 9999999999,
};


describe('ParentContract', function () {
    const provider = new MockProvider({
        ganacheOptions: {
            hardfork: 'istanbul',
            mnemonic: 'horn horn horn horn horn horn horn horn horn horn horn horn',
            gasLimit: 9999999999
        },
    });

    const [wallet, other] = provider.getWallets();

    let parent: Contract;
    let grapes: Contract;


    beforeEach(async function () {

        parent = await deployContract(wallet, ParentContract, [], overrides);


    });

    // it('set Claim Contract', async function () {


    //     // grapes = await deployContract(wallet, Grapes, [], overrides);
    //     // await parent.setClaimContract(grapes.address);

    // });

    describe('Function calls', function () {

        beforeEach(async function () {

            // grapes = await deployContract(wallet, Grapes, [], overrides);
            //await parent.setClaimContract(grapes.address);

        });

        describe('Desosits', function () {


            it('deposit Alpha', async function () {

                grapes = await deployContract(wallet, Grapes, [], overrides);
                console.log(await grapes.alphaClaimed(0));
                let not_x = await parent.depositAlphaTest(0, grapes.address);
                console.log(not_x);

                //expect(x).to.be.eq(2);
                


            });


            // it('deposit Beta ', async function () {


            // });

            // it('deposit Gamma ', async function () {


            // });

        });

        // describe('Matches', function () {


        //     it('match Gamma BAYC ', async function () {


        //     });

        //     it('match Gamma MAYC ', async function () {


        //     });

        //     it('match Alpha ', async function () {


        //     });

        //     it('match Beta ', async function () {


        //     });

        // });

        // describe('Withdrawls', function () {


        //     it('Withdrawl Alpha', async function () {


        //     });

        //     it('Withdrawl Beta', async function () {


        //     });


        //     it('Withdrawl Beta', async function () {


        //     });

        // });



    });


});