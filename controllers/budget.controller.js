const getTotal = async (BudgetObj,ptype,dateRange)=> {
    let curr = Date.now();
    let startDate;
    let cost = 0;
    if(dateRange == "week"){
        startDate = new Date(curr);
        startDate.setDate(startDate.getDate() - 7);
    }
    else if(dateRange == "month"){
        startDate = new Date(curr);
        startDate.setDate(startDate.getDate() - 30);
    }
    else{
        startdate = 0;
    }

    const funDocs = await BudgetObj.find({
        purchaseType : ptype,
        purchaseDate :{$gte: startDate, $lt: curr}
    });
    for await (const doc of funDocs) {
        cost += doc.purchaseCost
    }
    return `you spent $${cost} on ${ptype} this ${dateRange}`
}

module.exports.getTotal = getTotal