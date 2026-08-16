import { beforeEach, describe, expect, it } from '@jest/globals';
import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreditCardController } from 'src/controllers/creditCard.controller';
import { MastercardCreditCard } from 'src/services/mastercardCreditCard.service';
import { VisaCreditCard } from 'src/services/visaCreditCard.service';
import { TEST_VALUES as TV } from './test-values.mock';

describe('CreditCardController', () => {
  let controller: CreditCardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreditCardController],
      providers: [VisaCreditCard, MastercardCreditCard],
    }).compile();

    controller = module.get<CreditCardController>(CreditCardController);
  });

  it('Deve validar o cartão Visa.', () => {
    expect(
      controller.validCard({
        cardNumber: TV.VALID_NUMBER_VISA,
        cvv: TV.VALID_CVV,
      }),
    ).toBe(true);
  });

  it('Deve validar o cartão MasterCard.', () => {
    expect(
      controller.validCard({
        cardNumber: TV.VALID_NUMBER_MASTERCARD,
        cvv: TV.VALID_CVV,
      }),
    ).toBe(true);
  });

  it('Deve validar a bandeira do cartão.', () => {
    expect(() =>
      controller.validCard({
        cardNumber: TV.INVALID_NUMBER,
        cvv: TV.VALID_CVV,
      }),
    ).toThrow(BadRequestException);

    expect(() =>
      controller.validCard({
        cardNumber: TV.INVALID_NUMBER,
        cvv: TV.VALID_CVV,
      }),
    ).toThrow('Bandeira não suportada.');
  });

  it('Deve validar o CVV para cartão Visa.', () => {
    expect(() =>
      controller.validCard({
        cardNumber: TV.VALID_NUMBER_VISA,
        cvv: TV.INVALID_CVV,
      }),
    ).toThrow(BadRequestException);

    expect(() =>
      controller.validCard({
        cardNumber: TV.VALID_NUMBER_VISA,
        cvv: TV.INVALID_CVV,
      }),
    ).toThrow('CVV invalido para Visa. CVV deve ter três dígitos');
  });

  it('Deve validar o CVV para cartão MasterCard.', () => {
    expect(() =>
      controller.validCard({
        cardNumber: TV.VALID_NUMBER_MASTERCARD,
        cvv: TV.INVALID_CVV,
      }),
    ).toThrow(BadRequestException);

    expect(() =>
      controller.validCard({
        cardNumber: TV.VALID_NUMBER_MASTERCARD,
        cvv: TV.INVALID_CVV,
      }),
    ).toThrow(BadRequestException);
  });
});
