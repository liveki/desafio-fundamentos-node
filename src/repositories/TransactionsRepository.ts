import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  private balance: Balance;

  constructor() {
    this.transactions = [];

    this.balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    this.balance.income = this.getTotalIncomes();
    this.balance.outcome = this.getTotalOutcomes();
    this.balance.total = this.balance.income - this.balance.outcome;

    return this.balance;
  }

  private getTotalIncomes(): number {
    const sum = this.transactions.reduce((total, next) => {
      if (next.type === 'income') return total + next.value;
      return total;
    }, 0);

    return sum;
  }

  private getTotalOutcomes(): number {
    const sum = this.transactions.reduce((total, next) => {
      if (next.type === 'outcome') return total + next.value;
      return total;
    }, 0);

    return sum;
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
