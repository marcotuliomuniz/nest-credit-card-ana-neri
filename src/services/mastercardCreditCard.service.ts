import { BaseCreditCard } from './baseCreditCard.service';

export class MastercardCreditCard extends BaseCreditCard {
  protected validateCardNumber(cardNumber: string): void {
    throw new Error(`Method not implemented | Error in: ${cardNumber}`);
  }

  protected validateCvv(cvv: string): boolean {
    throw new Error(`Method not implemented | Error in: ${cvv}`);
  }
}
