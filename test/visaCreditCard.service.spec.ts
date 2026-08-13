import { beforeEach, describe, expect, it } from '@jest/globals';
import { VisaCreditCard } from 'src/services/visaCreditCard.service';

describe('VisaCreditCard', () => {
  let service: VisaCreditCard;

  beforeEach(() => {
    service = new VisaCreditCard();
  });

  it('Should validate CVV for Visa Card', () => {
    expect(service.processCreditCard('4111111111111', '123')).toBe(true);
  });
});
