const { assert, expect } = require("chai")
const { getNamedAccounts, deployments, ethers, network } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("BasicNft Unit Tests", function () {
          let basicNft, deployer, tokenCounter

          beforeEach(async function () {
              const accounts = await ethers.getSigners()
              deployer = accounts[0]
              await deployments.fixture(["all"])
              basicNft = await ethers.getContract("BasicNft")
              tokenCounter = await basicNft.getTokenCounter()
          })

          describe("mint", function () {
              it("mints correctly", async function () {
                  const tx = await basicNft.mintNft()
                  await tx.wait(1)
                  const tokenURI = await basicNft.tokenURI(0)
                  balanceOfDeployer = await basicNft.balanceOf(deployer.address)
                  ownerOfNft = await basicNft.ownerOf(tokenCounter)
                  newTokenCounter = await basicNft.getTokenCounter()

                  assert.equal(balanceOfDeployer.toString(), "1")
                  assert.equal(Number(newTokenCounter), Number(tokenCounter + 1))
                  assert.equal(ownerOfNft, deployer.address)
                  assert.equal(tokenURI, await basicNft.TOKEN_URI())
              })
          })
      })
