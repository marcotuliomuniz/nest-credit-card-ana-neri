import { beforeEach, describe, expect, it } from '@jest/globals';
import { BadRequestException } from '@nestjs/common';
import { MastercardCreditCard } from 'src/services/mastercardCreditCard.service';
import { TEST_VALUES as TV } from './test-values.mock';

describe('MastercardCreditCard', () => {
  let service: MastercardCreditCard;

  beforeEach(() => {
    service = new MastercardCreditCard();
  });

  it('Deve validar o CVV para cartão MasterCard', () => {
    expect(
      service.processCreditCard(TV.VALID_NUMBER_MASTERCARD, TV.VALID_CVV),
    ).toBe(true);
  });

  it('Deve validar se o número do cartão tem o formato certo', () => {
    expect(() =>
      service.processCreditCard(TV.INVALID_NUMBER, TV.VALID_CVV),
    ).toThrow(BadRequestException);
  });

  it('Deve validar se o número do cartão tem o formato certo', () => {
    expect(() =>
      service.processCreditCard(TV.INVALID_NUMBER, TV.VALID_CVV),
    ).toThrow('Número do cartão MasterCard inválido');
  });

  it('Deve validar se o CVV tem três dígitos', () => {
    expect(() =>
      service.processCreditCard(TV.VALID_NUMBER_MASTERCARD, TV.INVALID_CVV),
    ).toThrow(BadRequestException);
  });

  it('Deve validar se o CVV tem três dígitos', () => {
    expect(() =>
      service.processCreditCard(TV.VALID_NUMBER_MASTERCARD, TV.INVALID_CVV),
    ).toThrow('CVV invalido para MasterCard. CVV deve ter três dígitos');
  });
});
