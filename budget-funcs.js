const getTotal = async (BudgetObj,ptype,dateRng)=> {
    const funDocs = await BudgetObj.aggregate([{$match : {purchaseType : ptype}}])
    let cost = 0
    for await (const doc of funDocs) {
        cost += doc.purchaseCost
    }
    console.log(cost)
}