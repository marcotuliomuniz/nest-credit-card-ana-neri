import { beforeEach, describe, expect, it } from '@jest/globals';
import { BadRequestException } from '@nestjs/common';
import { VisaCreditCard } from 'src/services/visaCreditCard.service';
import { TEST_VALUES as TV } from './test-values.mock';

describe('VisaCreditCard', () => {
  let service: VisaCreditCard;

  beforeEach(() => {
    service = new VisaCreditCard();
  });

  it('Deve validar o CVV para cartão Visa', () => {
    expect(service.processCreditCard(TV.VALID_NUMBER_VISA, TV.VALID_CVV)).toBe(
      true,
    );
  });

  it('Deve validar se o número do cartão tem o formato certo', () => {
    expect(() =>
      service.processCreditCard(TV.INVALID_NUMBER, TV.VALID_CVV),
    ).toThrow(BadRequestException);
  });

  it('Deve validar se o número do cartão tem o formato certo', () => {
    expect(() =>
      service.processCreditCard(TV.INVALID_NUMBER, TV.VALID_CVV),
    ).toThrow('Número do cartão Visa inválido');
  });

  it('Deve validar se o CVV tem três dígitos', () => {
    expect(() =>
      service.processCreditCard(TV.VALID_NUMBER_VISA, TV.INVALID_CVV),
    ).toThrow(BadRequestException);
  });

  it('Deve validar se o CVV tem três dígitos', () => {
    expect(() =>
      service.processCreditCard(TV.VALID_NUMBER_VISA, TV.INVALID_CVV),
    ).toThrow('CVV invalido para Visa. CVV deve ter três dígitos');
  });
});
