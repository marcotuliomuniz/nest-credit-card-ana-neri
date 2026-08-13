import { MastercardCreditCard } from 'src/services/mastercardCreditCard.service';
import { VisaCreditCard } from 'src/services/visaCreditCard.service';
import { Post, Body } from '@nestjs/common';

interface ValidateCardDTO {
  cardNumber: string;
  cvv: string;
}

export class CreditCardController {
  constructor(
    private readonly visaCreditCard: VisaCreditCard,
    private readonly mastercardCreditCard: MastercardCreditCard,
  ) {}

  @Post('validate/card')
  validCard(@Body() body: ValidateCardDTO) {}
}
