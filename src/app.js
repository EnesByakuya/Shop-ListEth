App = {
    loading: false,
    contracts: {},

    load: async () => {
        await App.loadWeb3()
        await App.loadAccount()
        await App.loadContract()
        await App.render()
    },

    loadWeb3: async () => {
        if (window.ethereum) {
            App.web3Provider = window.ethereum
            window.web3 = new Web3(window.ethereum)

            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' })
            } catch (error) {
                console.error("User denied account access")
                return
            }
        } else if (window.web3) {
            App.web3Provider = window.web3.currentProvider
            window.web3 = new Web3(window.web3.currentProvider)
        } else {
            console.log('Non-Ethereum browser detected. Consider installing MetaMask!')
            return
        }
    },

    loadAccount: async () => {
        const accounts = await web3.eth.getAccounts()
        if (accounts.length === 0) {
            console.error("No accounts found")
            return
        }
        App.account = accounts[0]
        web3.eth.defaultAccount = App.account
    },


    loadContract: async () => {
        const shoppingListJSON = await $.getJSON('ShoppingList.json')
        App.contracts.ShoppingList = TruffleContract(shoppingListJSON)
        App.contracts.ShoppingList.setProvider(App.web3Provider)

        App.shoppingList = await App.contracts.ShoppingList.deployed()
    },


    render: async () => {
        if (App.loading) {
            return
        }

        App.setLoading(true)

        $('#account').html(App.account)

        await App.renderItems()

        App.setLoading(false)
    },

    renderItems: async () => {
        const itemCount = await App.shoppingList.itemCount()
        const $itemTemplate = $('.itemTemplate')

        for (var i = 1; i <= itemCount; i++) {
            const item = await App.shoppingList.items(i)
            const itemId = item[0].toNumber()
            const itemContent = item[1]
            const itemPurchased = item[2]

            const $newItemTemplate = $itemTemplate.clone()
            $newItemTemplate.find('.content').html(itemContent)
            $newItemTemplate.find('input')
                .prop('name', itemId)
                .prop('checked', itemPurchased)
                .on('click', App.togglePurchased)

            if (itemPurchased) {
                $('#purchasedItemList').append($newItemTemplate)
            } else {
                $('#itemList').append($newItemTemplate)
            }

            $newItemTemplate.show()
        }
    },

    createItem: async () => {
        App.setLoading(true)
        const content = $('#newItem').val()
        await App.shoppingList.createItem(content, { from: App.account })
        window.location.reload()
    },

    togglePurchased: async (e) => {
        e.preventDefault();
        App.setLoading(true)
        const itemId = e.target.name
        await App.shoppingList.togglePurchased(itemId, { from: App.account })
        window.location.reload()
    },

    setLoading: (boolean) => {
        App.loading = boolean
        const loader = $('#loader')
        const content = $('#content')
        if (boolean) {
            loader.show()
            content.hide()
        } else {
            loader.hide()
            content.show()
        }
    }
}

$(() => {
    $(window).load(() => {
        App.load()
    })
})