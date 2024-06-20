const Expense = require("../models/expense");

exports.getExpense = (req, res, next) => {
    Expense.findAll()
    .then((expenses) => {
        res.render("expense", {
            expenses: expenses,
        });
    }).catch(err => console.log(err));
};

exports.postExpense = (req, res, next) => {
    const category = req.body.exp_cat;
    const amount = req.body.exp_amt;
    const description = req.body.exp_desc;
    console.log('t');
    Expense.create({
        category: category,
        amount: amount,
        description: description
    })
    .then((result) => {
        res.redirect('/expense');
    }).catch(err => console.log(err));
};

exports.deleteExpense = (req, res, next) => {
    const expenseId = req.body.expenseId;
    Expense.findByPk(expenseId).then((expense) => {
        return expense.destroy();
    }).then((result) => {
        res.redirect('/expense');
    }).catch(err => console.log(err));
};

exports.editExpense = (req, res, next) => {
    const expenseId = req.query.expenseId;
    console.log(req.query, req.params);
    if (!expenseId) {
        return res.redirect('/expense');
    }
    Expense.findByPk(expenseId).then(expense => {
        if( !expense) {
        return res.redirect('/expense');
        }
        res.render('edit-expense', {
            expense: expense
        });
    }).catch(err => console.log(err));
};
exports.updateExpense = (req, res, next) => {
    const expenseId = req.body.expenseId;
    const updatedCategory = req.body.exp_cat;
    const updatedAmount = req.body.exp_amt;
    const updatedDescription = req.body.exp_desc;
    Expense.findByPk(expenseId).then(expense => {
        expense.category = updatedCategory;
        expense.amount = updatedAmount;
        expense.description = updatedDescription;
        return expense.save();
    })
    .then(result => {
        res.redirect('/expense');
    }).catch(err => console.log(err));
};
