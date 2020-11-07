export default interface ICreateMovement {
  title: string;
  type: 'income' | 'outcome';
  date: Date;
  frequency: 'recurring' | 'eventual';
  amount: number;
  description: string;
  user_id: string;
}
