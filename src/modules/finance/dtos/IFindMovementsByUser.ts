export default interface IFindMovemensByUser {
  user_id: string;
  type: 'income' | 'outcome';
  frequency: 'recurring' | 'eventual';
}
