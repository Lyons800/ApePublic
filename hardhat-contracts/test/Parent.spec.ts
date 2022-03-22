
// TOP Contract Parent.sol <- Child.sol
//  and         Parent.sol <- Grapes.sol (claim Contract)
import { ethers, waffle } from 'hardhat'
import { expect } from 'chai';
import { BigNumber, Contract } from 'ethers';
import { Wallet } from 'ethers'



describe('ParentContract', function () {
    

    let parent: Contract;
    let grapes: Contract;

    let wallet;
    let other;


    beforeEach(async function () {

        [wallet, other] =  await ethers.getSigners();

        const parent_contract = await ethers.getContractFactory("ParentContract");

        parent =  await parent_contract.deploy();


    });

    // it('set Claim Contract', async function () {


    //     // grapes = await deployContract(wallet, Grapes, [], overrides);
    //     // await parent.setClaimContract(grapes.address);

    // });

    describe('Function calls',  function () {

        beforeEach(async function () {

            const grape_contract = await ethers.getContractFactory("Grapes");

            grapes =  await grape_contract.deploy();
    

        });

        describe('Desosits', function () {


            it('deposit Alpha', async function () {

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