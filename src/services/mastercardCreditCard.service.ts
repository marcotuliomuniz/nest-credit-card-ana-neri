import { BadRequestException } from '@nestjs/common';
import { BaseCreditCard } from './baseCreditCard.service';

export class MastercardCreditCard extends BaseCreditCard {
  protected validateCardNumber(cardNumber: string): void {
    if (!cardNumber.startsWith('7')) {
      throw new BadRequestException('Número do cartão MasterCard inválido');
    }
  }

  protected validateCvv(cvv: string): boolean {
    if (cvv?.length !== 3) {
      throw new BadRequestException(
        'CVV invalido para MasterCard. CVV deve ter três dígitos',
      );
    }
    return true;
  }
}
