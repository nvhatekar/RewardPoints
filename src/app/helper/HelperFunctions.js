export const getPointPerTrans=(data)=>{
    // Calculate points per transaction
      const pointsPerTransaction = data.map(transaction=> {
      let points = 0;
      let over100 = transaction.amount - 100;

      if (over100 > 0) {
        // A customer receives 2 points for every dollar spent over $100 in each transaction      
        points += (over100 * 2);
      }    
      if (transaction.amount > 50) {
        // plus 1 point for every dollar spent over $50 in each transaction
        points += 50;      
      }
      const month = new Date(transaction.transactionDate).getMonth();
      return {...transaction, points, month};
    });
    return pointsPerTransaction;
}

export const getTotalPointsByCust=(data)=>{
    let pointsPerTransaction = getPointPerTrans(data)
    let distinctCustomer = getDistinctCustomer(pointsPerTransaction);
    let totlaByCustoer = [];
    distinctCustomer.forEach((o)=>{
        let _points = 0
        pointsPerTransaction.forEach((pt)=>{
            if(o === pt.name)
                _points += pt.points
        });
        totlaByCustoer.push({name:o,points:_points});
    })
    return totlaByCustoer
}

export const getPointsByCustMonth=(data)=>{
    let pointsPerTransaction = getPointPerTrans(data)
    let distinctCustomer = getDistinctCustomer(pointsPerTransaction);
    let distinctMonth = getDistinctMonths(pointsPerTransaction)
    let totlaByMonth = [];
    distinctCustomer.forEach((o)=>{
        distinctMonth.forEach((month)=>{
            let _points = 0;
            let _transactions = [];
            pointsPerTransaction.forEach((pt)=>{
                if(o === pt.name && month === pt.month){
                    _points += pt.points;
                    _transactions.push({tDate:pt.transactionDate,tAmount:pt.amount,tPoints:pt.points})
                }   
            });
            _points > 0 && totlaByMonth.push({name:o,month:month,points:_points,transDetail:_transactions});
        })
    })
    return totlaByMonth;
}

export const getDistinctCustomer=(pointsPerTransaction)=>{
    let mSet = new Set();
    pointsPerTransaction.forEach((o)=>{
        mSet.add(o.name);
    })
    return [...mSet];
}

export const getDistinctMonths=(pointsPerTransaction)=>{
    let mSet = new Set();
    pointsPerTransaction.forEach((o)=>{
        mSet.add(o.month);
    })
    return [...mSet];
}

export const getMonthFromNumber=(number)=>{
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months[number];
}