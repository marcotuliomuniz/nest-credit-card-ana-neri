import { MastercardCreditCard } from 'src/services/mastercardCreditCard.service';
import { VisaCreditCard } from 'src/services/visaCreditCard.service';
import { Post, Body, BadRequestException, Controller } from '@nestjs/common';

interface ValidateCardDTO {
  cardNumber: string;
  cvv: string;
}

@Controller()
export class CreditCardController {
  constructor(
    private readonly visaCreditCard: VisaCreditCard,
    private readonly mastercardCreditCard: MastercardCreditCard,
  ) {}

  @Post('validate/card')
  validCard(@Body() body: ValidateCardDTO) {
    const { cardNumber, cvv } = body;

    switch (cardNumber.charAt(0)) {
      case '4':
        return this.visaCreditCard.processCreditCard(cardNumber, cvv);
      case '7':
        return this.mastercardCreditCard.processCreditCard(cardNumber, cvv);
      default:
        throw new BadRequestException('Bandeira não suportada.');
    }
  }
}
