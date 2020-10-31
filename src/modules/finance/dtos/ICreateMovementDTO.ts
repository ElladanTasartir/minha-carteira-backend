export default interface ICreateMovement {
  title: string;
  type: 'income' | 'outcome';
  date: Date;
  frequency: string;
  amount: number;
  description: string;
}
