import { BadRequestException } from '@nestjs/common';
import { BaseCreditCard } from './baseCreditCard.service';

export class VisaCreditCard extends BaseCreditCard {
  protected validateCardNumber(cardNumber: string): void {
    if (!cardNumber.startsWith('4')) {
      throw new BadRequestException('Número do cartão Visa inválido');
    }
  }

  protected validateCvv(cvv: string): boolean {
    if (cvv?.length !== 3) {
      throw new BadRequestException(
        'CVV invalido para Visa. CVV deve ter três dígitos',
      );
    }
    return true;
  }
}
