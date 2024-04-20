# Notional

## What it does

Notional is a helper app to GitHub for incentivising development of issues in GitHub repos. It helps teams delegate work amongst themselves using a pay-by-task model. Repo Owners can create ‘bounties’ on GitHub issues, and Devs can score the bounties by resolving issues. This creates a marketplace of issues / issue-solvers and can help streamline the development of software projects. The app can be used by regular software teams to automate their payments, or outsource work, and DAOs can benefit from the app's decentralisation to commission work in a more trustless way.

In the app, owners of GitHub repos can sign in and connect their wallets. The app displays the open Github issues in their Repositories. They can create bounties for each issue, and these bounties are available to developers or ‘bounty hunters’. Repo Owners can also cancel their bounties and withdraw the payments if the bounty is not yet closed.

Developer or ‘bounty hunters’ can also sign in and connect their wallets. They can see a list of open bounties in a repository, with the payment amounts shown. Each bounty also links to the GitHub page for that issue. This serves as a dashboard for Developers to find work. When the GitHub username they registered to the platform creates a successful Pull Request, which closes a bounty issue, the Developer is paid the bounty.

## How we built it

We have a javascript frontend which interfaces with our smart contract backend. It also tracks created/cancelled bounties by using The Graph to index the on-chain Escrow contracts.

The app connects to our Main contract, which stores information about users and is the main control centre for the other contracts. It acts as the ‘Escrow factory’, and generates the Escrow contracts which hold payments.

When creating a bounty on an issue, the issue ID and repository information, as well as the payment, are passed through Main to deploy a new ‘Escrow’ contract. There is one Escrow contract deployed per bounty. Each Escrow contract calls the Chainlink Functions Consumer to query the GitHub API. It does this by passing in the issue ID and repo information to the Functions script, and then the Functions script calls the GitHub API. The script performs a search for merged pull requests in the specified repo, and iterates through the commits of each PR to check if the PR is linked to the relevant issue. If a commit message of a merged PR contains the issue ID, we return the author of the PR.

Github usernames are associated with wallet addresses in a mapping in Main, so this can be used to lookup the wallet address from the Author returned by Chainlink Functions.

We used Hardhat to test and deploy all our contracts.

## Challenges we ran into

We experienced issues when trying to call our Chainlink Functions request both from an on-chain source and directly from web3.js. The error was ‘cannot estimate gas’ when calling our ‘executeRequest’ method in the Consumer. Despite manually setting a gasLimit, we could not get it to work. However, the Functions script was confirmed to work when simulated in the Functions-Hardhat-Starter-Kit. If completed, our Functions would have triggered a payment from Escrow to the author of the merged PR by looking up the author name in the username-address mapping in Main. This would mean that any registered Dev could receive payout just by submitting a successful PR for the issue.

We spent a lot of time trying to fix the above issue, which meant we also ran out of time to implement Chainlink Automation. We would have added an automated call to a method which iterates through each Escrow, and prompts each one to make a Functions request.The status of every bounty would be checked every hour, so if a developer performs a task, they would be paid within the hour.

## Accomplishments that we're proud of

We are proud of learning about Chainlink Functions, given that it is a new technology with a lot of potential. We are also proud that we were able to build a web interface with Web3 elements that could interface with smart contracts/The Graph as a backend as opposed to a traditional database. It was great to make our ideals of decentralisation and automation tangible.
