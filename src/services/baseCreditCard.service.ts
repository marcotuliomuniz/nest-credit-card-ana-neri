import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export abstract class BaseCreditCard {
  processCreditCard(cardNumber: string, cvv: string) {
    try {
      this.validateCardNumber(cardNumber);
      return this.validateCvv(cvv);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  protected abstract validateCardNumber(cardNumber: string): void;
  protected abstract validateCvv(cvv: string): boolean;
}
